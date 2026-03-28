"use client";

import { KeyboardEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) onSend();
  };

  return (
    <div className="px-4 py-2.5 border-t border-border shrink-0" style={{ background: "var(--card)" }}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Waiting for response..." : "Type a message..."}
          disabled={disabled}
          className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none transition-colors focus:ring-1 focus:ring-ring disabled:opacity-50"
          style={{ background: "var(--background)", border: "0.5px solid var(--border)", color: "var(--foreground)" }}
          aria-label="Message input"
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="px-5 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
