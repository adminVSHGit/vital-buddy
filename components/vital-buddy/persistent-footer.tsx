export function PersistentFooter({ onOpenResources }: { onOpenResources?: () => void }) {
  return (
    <footer
      className="px-3 pt-1.5 pb-1.5 md:pt-2.5 md:pb-2 border-t border-border shrink-0"
      style={{ background: "var(--background)" }}
    >
      <p className="leading-snug text-center" style={{ color: "var(--foreground-ghost)", fontSize: "10px" }}>
        Vital Buddy is an AI and can make mistakes. Please verify important information. By using
        this service, you consent to Vital Start&apos;s terms and conditions. If this is a
        life-threatening emergency, dial 911 or go to the nearest ER immediately.
      </p>
      <nav className="grid grid-cols-2 md:flex md:justify-center gap-x-3 gap-y-0.5 md:gap-5 mt-1" aria-label="Footer links">
        <a href="https://vitalstart.com/support" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline text-left md:text-center" style={{ color: "var(--brand)", fontSize: "10px" }}>
          Connect to support
        </a>
        <button onClick={onOpenResources} className="cursor-pointer hover:underline text-left md:text-center" style={{ color: "var(--brand)", fontSize: "10px" }}>
          Browse resources
        </button>
        <a href="https://vitalstart.com/terms" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline text-left md:text-center" style={{ color: "var(--brand)", fontSize: "10px" }}>
          Terms &amp; conditions
        </a>
        <a href="tel:988" className="cursor-pointer hover:underline text-left md:text-center" style={{ color: "var(--danger)", fontSize: "10px" }}>
          988 Crisis Lifeline
        </a>
      </nav>
    </footer>
  );
}
