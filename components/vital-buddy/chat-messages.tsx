"use client";

import { useEffect, useRef, ReactNode } from "react";
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

function renderMessageContent(text: string): ReactNode {
  const vimeoRegex = /https?:\/\/(?:www\.)?vimeo\.com\/\d+[^\s)"\]']*/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // First, handle Vimeo URLs
  const vimeoMatches: Array<{ url: string; id: string; index: number }> = [];
  while ((match = vimeoRegex.exec(text)) !== null) {
    const matchedUrl = match[0];
    const idMatch = matchedUrl.match(/vimeo\.com\/(\d+)/);
    const vimeoId = idMatch ? idMatch[1] : null;
    if (vimeoId) {
      vimeoMatches.push({
        url: matchedUrl,
        id: vimeoId,
        index: match.index,
      });
    }
  }

  if (vimeoMatches.length === 0) {
    // No Vimeo videos, just handle regular URLs and text
    const textParts: ReactNode[] = [];
    let textLastIndex = 0;
    const urlMatches = [...text.matchAll(urlRegex)];
    
    urlMatches.forEach((urlMatch) => {
      if (urlMatch.index! > textLastIndex) {
        textParts.push(text.substring(textLastIndex, urlMatch.index));
      }
      textParts.push(
        <a
          key={`url-${urlMatch.index}`}
          href={urlMatch[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--brand)" }}
        >
          {urlMatch[0]}
        </a>
      );
      textLastIndex = urlMatch.index! + urlMatch[0].length;
    });
    
    if (textLastIndex < text.length) {
      textParts.push(text.substring(textLastIndex));
    }
    return <span>{textParts}</span>;
  }

  // Handle mixed content with Vimeo videos
  vimeoMatches.forEach((vimeo, idx) => {
    // Add text before this Vimeo URL
    if (vimeo.index > lastIndex) {
      const beforeText = text.substring(lastIndex, vimeo.index);
      const urlMatches = [...beforeText.matchAll(urlRegex)];
      const beforeParts: ReactNode[] = [];
      let beforeLastIndex = 0;

      urlMatches.forEach((urlMatch) => {
        if (urlMatch.index! > beforeLastIndex) {
          beforeParts.push(beforeText.substring(beforeLastIndex, urlMatch.index));
        }
        beforeParts.push(
          <a
            key={`url-${lastIndex}-${urlMatch.index}`}
            href={urlMatch[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "var(--brand)" }}
          >
            {urlMatch[0]}
          </a>
        );
        beforeLastIndex = urlMatch.index! + urlMatch[0].length;
      });

      if (beforeLastIndex < beforeText.length) {
        beforeParts.push(beforeText.substring(beforeLastIndex));
      }

      if (beforeParts.length > 0) {
        parts.push(beforeParts);
      }
    }

    // Add Vimeo video embed
    parts.push(
      <div key={`vimeo-${idx}`} className="mt-2 mb-1">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "0.5px solid var(--border)",
            aspectRatio: "16/9",
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${vimeo.id}?badge=0&autopause=0&player_id=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vital Buddy resource"
            style={{ display: "block" }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <div
          className="flex items-center gap-1.5 mt-1"
          style={{
            fontSize: "11px",
            color: "var(--foreground-ghost)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Vital Buddy resource</span>
        </div>
      </div>
    );

    lastIndex = vimeo.index + vimeo.url.length;
  });

  // Add any remaining text after the last Vimeo URL
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    const urlMatches = [...remainingText.matchAll(urlRegex)];
    const remainingParts: ReactNode[] = [];
    let remainingLastIndex = 0;

    urlMatches.forEach((urlMatch) => {
      if (urlMatch.index! > remainingLastIndex) {
        remainingParts.push(remainingText.substring(remainingLastIndex, urlMatch.index));
      }
      remainingParts.push(
        <a
          key={`url-end-${urlMatch.index}`}
          href={urlMatch[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--brand)" }}
        >
          {urlMatch[0]}
        </a>
      );
      remainingLastIndex = urlMatch.index! + urlMatch[0].length;
    });

    if (remainingLastIndex < remainingText.length) {
      remainingParts.push(remainingText.substring(remainingLastIndex));
    }

    if (remainingParts.length > 0) {
      parts.push(remainingParts);
    }
  }

  return <span>{parts}</span>;
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
    <div className="flex flex-col gap-2 py-3 px-3">
      {messages.map((m, i) => {
        if (m.type === "escalation") return <EscalationBubble key={i} />;
        if (m.from === "system") return <p key={i} className="text-center text-xs py-1" style={{ color: "var(--foreground-ghost)" }}>{m.text}</p>;
        const isUser = m.from === "user";
        return (
          <div key={i} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
            <div className="max-w-[85%] px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap" style={{
              borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
              background: isUser ? "var(--brand-light)" : "var(--card)",
              color: isUser ? "var(--brand-dark)" : "var(--foreground-muted)",
              border: isUser ? "none" : "0.5px solid var(--border)",
            }}>{isUser ? m.text : renderMessageContent(m.text)}</div>
            {!isUser && m.resources && m.resources.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1.5 max-w-[85%]">
                {m.resources.slice(0, 2).map((r: any, ri: number) => {
                  const vimeoMatch = (r.content_url || '').match(/vimeo\.com\/(\d+)/);
                  const vimeoId = vimeoMatch ? vimeoMatch[1] : null;
                  return (
                    <div key={ri} className="rounded-xl overflow-hidden" style={{ background: 'var(--card)', border: '0.5px solid var(--border)' }}>
                      {vimeoId && (
                        <div style={{ aspectRatio: '16/9' }}>
                          <iframe
                            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0`}
                            width="100%" height="100%" frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin"
                            style={{ display: 'block' }}
                          />
                        </div>
                      )}
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-medium">{r.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--foreground-ghost)' }}>
                          {r.duration_mins} min • {r.description?.substring(0, 80)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
