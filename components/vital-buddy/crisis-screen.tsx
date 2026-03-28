"use client";

import { CRISIS_SCREEN } from "@/lib/vital-buddy-types";

interface CrisisScreenProps {
  onAcknowledge: () => void;
}

export function CrisisScreen({ onAcknowledge }: CrisisScreenProps) {
  return (
    <div className="px-4 py-8 flex flex-col items-center text-center">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shrink-0"
        style={{ background: "var(--danger-light)" }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 9v4m0 4h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      </div>

      <h2 className="text-lg font-medium leading-snug mb-3 text-balance max-w-xs">
        {CRISIS_SCREEN.heading}
      </h2>

      <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--foreground-subtle)" }}>
        {CRISIS_SCREEN.body}
      </p>

      {/* Resources */}
      <div className="flex flex-col gap-2.5 w-full mb-6">
        {CRISIS_SCREEN.resources.map((r, i) => {
          const bgStyle =
            i === 0
              ? { background: "var(--danger)", color: "#fff" }
              : i === 1
              ? { background: "var(--foreground)", color: "#fff" }
              : { background: "var(--surface-secondary)", color: "var(--foreground-muted)" };

          return (
            <a
              key={i}
              href={r.href ?? "#"}
              className="block px-4 py-3.5 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={bgStyle}
            >
              {r.label}
              {r.desc && (
                <span className="block text-xs font-normal opacity-80 mt-0.5">
                  {r.desc}
                </span>
              )}
            </a>
          );
        })}
      </div>

      <p className="text-base font-medium mb-4">You matter. Please reach out.</p>

      <button
        onClick={onAcknowledge}
        className="px-7 py-2.5 rounded-lg text-xs cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{
          background: "transparent",
          border: "0.5px solid var(--border-muted)",
          color: "var(--foreground-faint)",
        }}
      >
        {"I've seen this"}
      </button>

      <p className="text-xs mt-3" style={{ color: "var(--foreground-ghost-2)" }}>
        AI peer persona is not active on this screen.
      </p>
    </div>
  );
}
