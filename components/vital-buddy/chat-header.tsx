"use client";

import Image from "next/image";
import { SCORE_COLORS } from "@/lib/vital-buddy-types";

interface ChatHeaderProps {
  phase: string;
  openScore: number | null;
  onEndSession: () => void;
  onOpenResources: () => void;
}

export function ChatHeader({ phase, openScore, onEndSession, onOpenResources }: ChatHeaderProps) {
  const inChat = phase === "chat";

  return (
    <header className="flex flex-col border-b border-border bg-card shrink-0">
      {/* Top row: avatar + title | logo */}
      <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #EEEDFE 0%, #E1F5EE 100%)" }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium tracking-tight leading-tight">Vital Buddy</p>
          <p className="text-xs text-foreground-ghost leading-tight">Peer support for Resident Resilience</p>
        </div>

        {/* Logo — always top right */}
        <Image
          src="/vital-start-logo.png"
          alt="VitalStart"
          width={90}
          height={28}
          priority
        />
      </div>

      {/* Bottom row: action buttons — only shown during chat */}
      {inChat && (
        <div className="flex items-center gap-2 px-4 pb-2.5">
          {openScore !== null && (
            <div
              className="text-xs px-2.5 py-1 rounded-md"
              style={{ background: "var(--surface-secondary)", color: "var(--foreground-ghost)" }}
            >
              Opened at{" "}
              <span className="font-semibold" style={{ color: SCORE_COLORS[openScore] }}>
                {openScore}
              </span>
            </div>
          )}
          <div className="flex-1" />
          <button
            onClick={onOpenResources}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-opacity hover:opacity-80 cursor-pointer shrink-0"
            style={{ background: "var(--surface-secondary)", color: "var(--foreground-subtle)" }}
          >
            Resources
          </button>
          <button
            onClick={onEndSession}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-opacity hover:opacity-80 cursor-pointer shrink-0"
            style={{ background: "var(--brand-light)", color: "var(--brand)" }}
          >
            End session
          </button>
        </div>
      )}
    </header>
  );
}
