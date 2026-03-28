"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/vital-buddy-types";
import { EscalationBubble } from "./escalation-bubble";
import { StressSlider } from "./stress-slider";

interface ChatMessagesProps {
  messages: Message[];
  phase: string;
  showSlider: boolean;
  sliderValue: number;
  onSliderChange: (v: number) => void;
  onSliderSubmit: (v: number) => void;
  loading?: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-2.5 max-w-[80px] rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl" style={{ background: "var(--card)", border: "0.5px solid var(--border)" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full" style={{ background: "var(--foreground-ghost)", animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }} />
      ))}
      <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

export function ChatMessages({ messages, phase, showSlider, sliderValue, onSliderChange, onSliderSubmit, loading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, phase, showSlider, loading]);

  return (
    <div className="flex flex-col gap-2.5 py-4 px-4">
      {messages.map((m, i) => {
        if (m.type === "escalation") return <EscalationBubble key={i} />;
        if (m.from === "system") return <p key={i} className="text-center text-xs py-2" style={{ color: "var(--foreground-ghost)" }}>{m.text}</p>;
        const isUser = m.from === "user";
        return (
          <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap" style={{
              borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
              background: isUser ? "var(--brand-light)" : "var(--card)",
              color: isUser ? "var(--brand-dark)" : "var(--foreground-muted)",
              border: isUser ? "none" : "0.5px solid var(--border)",
            }}>{m.text}</div>
          </div>
        );
      })}

      {loading && <TypingIndicator />}

      {phase === "stress_open" && !loading && (
        <StressSlider value={sliderValue} onChange={onSliderChange} onSubmit={onSliderSubmit} />
      )}
      {showSlider && phase === "chat" && !loading && (
        <StressSlider value={sliderValue} onChange={onSliderChange} onSubmit={onSliderSubmit} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
