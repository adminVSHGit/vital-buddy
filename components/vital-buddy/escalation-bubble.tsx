"use client";

export function EscalationBubble() {
  return (
    <div
      className="max-w-[88%] p-4 rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
      style={{
        background: "var(--warning-light)",
        border: "0.5px solid var(--warning)",
      }}
      role="alert"
    >
      {/* Tag */}
      <span
        className="inline-block text-xs font-medium px-2 py-0.5 rounded-lg mb-2"
        style={{ background: "#FFF8E8", color: "var(--warning-dark)" }}
      >
        Outside my scope
      </span>

      <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--warning-text)" }}>
        {"That's outside what I know well enough to answer confidently — I don't want to guess on something that matters this much."}
      </p>

      <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--warning-text)" }}>
        Would you like me to connect you to someone who can actually help?
      </p>

      <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--danger)" }}>
        If this is a life-threatening condition, please dial 911 or head to the ER right away.
      </p>

      <div className="flex gap-2 mt-3">
        <button
          className="px-4 py-2 rounded-lg text-xs font-medium text-white cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--foreground)" }}
        >
          Connect to support
        </button>
        <button
          className="px-4 py-2 rounded-lg text-xs cursor-pointer transition-opacity hover:opacity-80"
          style={{
            background: "transparent",
            border: "0.5px solid var(--border-muted)",
            color: "var(--foreground-subtle)",
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
