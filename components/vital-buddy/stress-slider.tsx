"use client";

import { SCORE_COLORS } from "@/lib/vital-buddy-types";

interface StressSliderProps {
  value: number;
  onChange: (v: number) => void;
  onSubmit: (v: number) => void;
}

function getLabel(value: number) {
  if (value <= 3) return "Low stress";
  if (value <= 6) return "Moderate stress";
  if (value <= 9) return "High stress";
  return "Crisis level";
}

export function StressSlider({ value, onChange, onSubmit }: StressSliderProps) {
  const color = SCORE_COLORS[value];

  return (
    <div className="py-4">
      {/* Score display */}
      <div className="text-center mb-4">
        <span
          className="text-5xl font-medium leading-none tabular-nums transition-colors duration-300"
          style={{ color }}
        >
          {value}
        </span>
        <p className="text-xs mt-1" style={{ color: "var(--foreground-faint)" }}>
          {getLabel(value)}
        </p>
      </div>

      {/* Slider track */}
      <div className="flex items-center gap-3 px-2">
        <span className="text-xs w-4 text-center shrink-0" style={{ color: "var(--foreground-ghost-2)" }}>
          0
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: color }}
          aria-label="Stress level"
        />
        <span className="text-xs w-4 text-center shrink-0" style={{ color: "var(--foreground-ghost-2)" }}>
          10
        </span>
      </div>

      {/* Labels */}
      <div className="flex justify-between px-5 mt-1">
        <span className="text-xs" style={{ color: "var(--foreground-ghost-2)" }}>
          Calm
        </span>
        <span className="text-xs" style={{ color: "var(--foreground-ghost-2)" }}>
          Highest stress
        </span>
      </div>

      {/* Submit */}
      <button
        onClick={() => onSubmit(value)}
        className="w-full mt-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
      >
        Submit
      </button>
    </div>
  );
}
