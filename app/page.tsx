import { VitalBuddy } from "@/components/vital-buddy/vital-buddy";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 font-sans" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-sm">
        <VitalBuddy />
      </div>
    </main>
  );
}
