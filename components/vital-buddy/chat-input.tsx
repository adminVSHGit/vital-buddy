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
    <div className="px-3 py-2 border-t border-border shrink-0" style={{ background: "var(--card)" }}>
      <div className="flex gap-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Waiting for response..." : "Type a message..."}
          disabled={disabled}
          className="flex-1 px-3 py-2 text-sm rounded-xl outline-none transition-colors focus:ring-1 focus:ring-ring disabled:opacity-50"
          style={{ background: "var(--background)", border: "0.5px solid var(--border)", color: "var(--foreground)" }}
          aria-label="Message input"
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="px-4 py-2 text-sm font-medium rounded-xl cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      <div className="flex gap-1.5 mt-1 px-0.5">
        <button
          onClick={onOpenResources}
          className="text-xs px-2 py-0.5 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "var(--brand-light)", color: "var(--brand)" }}
        >
          Browse resources
        </button>
      </div>
    </div>
  );
}
