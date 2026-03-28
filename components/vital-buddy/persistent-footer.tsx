export function PersistentFooter({ onOpenResources }: { onOpenResources?: () => void }) {
  return (
    <footer
      className="px-4 pt-2.5 pb-2 border-t border-border shrink-0"
      style={{ background: "var(--background)" }}
    >
      <p className="text-xs leading-snug text-center" style={{ color: "var(--foreground-ghost)" }}>
        Vital Buddy is an AI and can make mistakes. Please verify important information. By using
        this service, you consent to Vital Start&apos;s terms and conditions. If this is a
        life-threatening emergency, dial 911 or go to the nearest ER immediately.
      </p>
      <nav className="flex justify-center gap-5 mt-1.5" aria-label="Footer links">
        <button className="text-xs cursor-pointer hover:underline" style={{ color: "var(--brand)" }}>
          Connect to support
        </button>
        <button onClick={onOpenResources} className="text-xs cursor-pointer hover:underline" style={{ color: "var(--brand)" }}>
          Browse resources
        </button>
        <button className="text-xs cursor-pointer hover:underline" style={{ color: "var(--brand)" }}>
          Terms &amp; conditions
        </button>
        <button className="text-xs cursor-pointer hover:underline" style={{ color: "var(--danger)" }}>
          988 Crisis Lifeline
        </button>
      </nav>
    </footer>
  );
}
