"use client";

import { KeyboardEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  onOpenResources?: () => void;
}

export function ChatInput({ value, onChange, onSend, disabled, onOpenResources }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) onSend();
  };

  return (
    <div className="px-4 py-3 shrink-0" style={{ background: "transparent" }}>
      <div className="flex gap-3 items-center px-4 py-3.5 rounded-full" style={{ background: "rgba(255, 255, 255, 0.95)", border: "1px solid rgba(83, 74, 183, 0.15)", boxShadow: "0 4px 16px rgba(83, 74, 183, 0.08)" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Waiting for response..." : "Type a message..."}
          disabled={disabled}
          className="flex-1 text-sm outline-none disabled:opacity-50"
          style={{ background: "transparent", color: "var(--foreground)" }}
          aria-label="Message input"
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          style={{ background: "var(--brand)", color: "white" }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      <div className="flex gap-2 mt-2.5 px-1">
        <button 
          onClick={onOpenResources}
          className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
          style={{ background: 'var(--brand-light)', color: 'var(--brand)' }}
        >
          Browse resources
        </button>
      </div>
    </div>
  );
}
