"use client";

import { MODES, type Mode } from "@/lib/vital-buddy-types";

interface ModeSelectProps {
  onSelect: (mode: Mode) => void;
}

function ModeIcon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand)" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function ModeSelect({ onSelect }: ModeSelectProps) {
  return (
    <section className="flex flex-col h-full">
      <div className="text-center pt-8 pb-6 px-4">
        <h1 className="text-2xl font-medium tracking-tight text-balance mb-1.5">
          What brings you in?
        </h1>
        <p className="text-sm" style={{ color: "var(--foreground-faint)" }}>
          Pick what fits right now.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            className="p-4 bg-card border border-border rounded-xl cursor-pointer text-left transition-all hover:border-brand hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5"
              style={{ background: "var(--brand-light)" }}
            >
              <ModeIcon d={m.icon} />
            </div>
            <p className="text-sm font-medium mb-0.5">{m.label}</p>
            <p className="text-xs" style={{ color: "var(--foreground-ghost)" }}>
              {m.sub}
            </p>
          </button>
        ))}
      </div>

      <p className="text-center mt-5 text-xs" style={{ color: "var(--foreground-ghost-2)" }}>
        Your session is completely anonymous.
      </p>
    </section>
  );
}
