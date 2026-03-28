"use client";

import { useState, useCallback } from "react";
import { type Message, type Mode, type Phase } from "@/lib/vital-buddy-types";
import { startSession, sendMessage, closeSession, isConnected } from "@/lib/n8n-api";
import { ChatHeader } from "./chat-header";
import { ModeSelect } from "./mode-select";
import { ChatMessages } from "./chat-messages";
import { CrisisScreen } from "./crisis-screen";
import { ChatInput } from "./chat-input";
import { PersistentFooter } from "./persistent-footer";
import { ResourceDrawer } from "./resource-drawer";

const CRISIS_KEYWORDS = ["suicide", "suicidal", "kill myself", "end it all", "better off dead", "no reason to live", "want to die", "self-harm", "hurt myself", "end my life", "not worth living"];

export function VitalBuddy() {
  const [phase, setPhase] = useState<Phase>("mode_select");
  const [mode, setMode] = useState<Mode | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [score, setScore] = useState(4);
  const [openScore, setOpenScore] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showCloseSlider, setShowCloseSlider] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);

  const addMsg = useCallback((text: string, from: Message["from"] = "ai", type: Message["type"] = "normal", resources: any[] = []) => {
    setMessages((prev) => [...prev, { text, from, type, time: new Date(), resources }]);
    if (from === "user") setHistory((prev) => [...prev, { role: "user", content: text }]);
    else if (type === "normal" && from === "ai") setHistory((prev) => [...prev, { role: "assistant", content: text }]);
  }, []);

  const handleN8NResponse = useCallback((res: Awaited<ReturnType<typeof startSession>>) => {
    if (res.type === "crisis_screen") { setShowCrisis(true); setPhase("crisis"); return; }
    const text = res.message || res.output || "";
    if (!text) return;
    if (res.type === "escalation" || res.filtered) {
      try { const p = JSON.parse(text); addMsg(p.message || text, "ai", "escalation"); } catch { addMsg(text, "ai", "escalation"); }
    } else {
      addMsg(text, "ai", "normal", res.resources || []);
    }
  }, [addMsg]);

  const handleModeSelect = async (m: Mode) => {
    setMode(m); setPhase("stress_open");
    const sid = crypto.randomUUID(); setSessionId(sid);

    // Show opening INSTANTLY from local — no waiting
    const openers: Record<string, string[]> = {
      standard: [
        "Hey — how's the shift been? Before we get into it...",
        "I am here for you. How stressful are you feeling currently, from 0 to 10, with 10 signifying highest stress?",
        "Quick heads up — hit the Resources button anytime if you need a quick reset. Breathing exercises, peer stories, sleep stuff. They're short and they actually work."
      ],
      critical_event: [
        "Sounds like a rough one. I've had those cases where you just stand in the hallway for a second. Let's check in.",
        "I am here for you. How stressful are you feeling currently, from 0 to 10, with 10 signifying highest stress?",
        "Also — Resources tab up top has some 2-minute resets if you need one mid-conversation. No pressure."
      ],
      grounding: [
        "Two minutes. I promise this works even when it sounds dumb. Ready?",
        "I am here for you. How stressful are you feeling currently, from 0 to 10, with 10 signifying highest stress?",
        "If you want to try a different exercise later, the Resources button has a few more options — breathing, body scans, the works."
      ],
      pre_convo: [
        "Family meetings are rough. I still get nervous before them. Let's get you ready.",
        "I am here for you. How stressful are you feeling currently, from 0 to 10, with 10 signifying highest stress?",
        "Before we prep — check out the Resources tab. The 'Ready and Empowered' grounding exercise is a 2-minute reset that gets you centered before walking in. Seriously worth it.",
      ],
    };
    (openers[m.id] ?? openers.standard).forEach((line) => addMsg(line));

    // Call n8n in background for session logging — don't wait for it
    if (isConnected()) {
      startSession(m.id, sid).catch(() => {});
    }
  };

  const handleOpenScore = async (s: number) => {
    addMsg(String(s), "user"); setOpenScore(s);
    if (s === 10) {
      setShowCrisis(true); setPhase("crisis");
      if (isConnected() && sessionId && mode) sendMessage({ sessionId, message: "STRESS_SCORE:10", openingScore: 10, mode: mode.id, history: [] });
      return;
    }
    setPhase("chat");
    if (isConnected() && sessionId && mode) {
      setLoading(true);
      const res = await sendMessage({ sessionId, message: `STRESS_SCORE:${s}`, openingScore: s, mode: mode.id, history: [] });
      setLoading(false); handleN8NResponse(res);
    } else {
      if (s <= 3) addMsg(`Nice — a ${s}. You're in a decent spot. Let's make the most of it. What would the ideal version of tomorrow look like for you?`);
      else if (s <= 6) addMsg(`A ${s} — yeah, that's a full plate. I've got a 90-second breathing thing that actually works. Takes the edge off before rounds. Want to try it?`);
      else addMsg(`A ${s}. That's a lot. Let's start with something small — just getting grounded for a sec. I can guide you through Box Breathing, the 5 Senses technique, Humming, or Lion's Breath. Which one sounds good?`);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim(); setInput(""); addMsg(text, "user");
    const lc = text.toLowerCase();
    if (CRISIS_KEYWORDS.some((w) => lc.includes(w))) { setShowCrisis(true); setPhase("crisis"); return; }
    if (isConnected() && sessionId && mode && openScore !== null) {
      setLoading(true);
      const res = await sendMessage({ sessionId, message: text, openingScore: openScore, mode: mode.id, history: history.slice(-10) });
      setLoading(false); handleN8NResponse(res);
    } else {
      const oos = ["dosage", "prescri", "diagnos", "medication", "should i take", "what drug", "what pill", "is this depression", "do i have"];
      if (oos.some((w) => lc.includes(w))) { setMessages((prev) => [...prev, { text: "__ESCALATION__", from: "ai", type: "escalation", time: new Date() }]); return; }
      const fb = ["That sounds really heavy. When you step back, what do you think is driving most of that weight?", "I hear you. Is this something that needs solving today, or something you need to just survive today?", "That makes sense. What would you tell a fellow resident if they came to you with exactly this?", "You're carrying a lot. What's one piece of this that is actually in your hands right now?", "That's a really valid response to an impossible situation. What would 'good enough for today' look like?"];
      setTimeout(() => addMsg(fb[Math.floor(Math.random() * fb.length)]), 800);
    }
  };

  const handleEndSession = () => { setShowCloseSlider(true); addMsg("Alright, catch up soon! I am always here for you. Before you go, how are you feeling now from 0 to 10 with 10 being the most stressed? This helps me support you better, thanks!"); };
  const handleHome = () => { setPhase("mode_select"); setMessages([]); setMode(null); setOpenScore(null); setShowCloseSlider(false); setShowCrisis(false); setHistory([]); setSessionId(null); };

  const handleCloseScore = async (s: number) => {
    addMsg(String(s), "user"); setShowCloseSlider(false);
    if (isConnected() && sessionId && openScore !== null && mode) {
      closeSession(sessionId, openScore, s, mode.id);
    }
    setPhase("mode_select"); setMessages([]); setScore(4); setOpenScore(null); setSessionId(null); setMode(null); setInput(""); setHistory([]);
  };

  return (
    <div className="flex flex-col w-full h-full max-h-[740px] rounded-2xl overflow-hidden" style={{ background: "var(--background)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 8px 32px rgba(83, 74, 183, 0.12), 0 0 0 1px rgba(255,255,255,0.5) inset", border: "1px solid rgba(255,255,255,0.3)" }}>
      <ChatHeader phase={phase} openScore={openScore} onEndSession={handleEndSession} onOpenResources={() => setShowResources(true)} onHome={handleHome} />
      <main className="flex-1 overflow-y-auto relative">
        {phase === "mode_select" && <ModeSelect onSelect={handleModeSelect} />}
        {showCrisis && <CrisisScreen onAcknowledge={() => { setShowCrisis(false); setPhase("done"); addMsg("Session ended. Take care of yourself.", "system"); }} />}
        {!showCrisis && phase !== "mode_select" && (
          <ChatMessages messages={messages} phase={phase} showSlider={showCloseSlider} sliderValue={score} onSliderChange={setScore} onSliderSubmit={phase === "stress_open" ? handleOpenScore : handleCloseScore} loading={loading} />
        )}
        <ResourceDrawer isOpen={showResources} onClose={() => setShowResources(false)} />
      </main>
      {phase === "chat" && !showCloseSlider && <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={loading} onOpenResources={() => setShowResources(true)} />}
      <PersistentFooter onOpenResources={() => setShowResources(true)} />
    </div>
  );
}
