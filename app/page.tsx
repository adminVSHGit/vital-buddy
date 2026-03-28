import { VitalBuddy } from "@/components/vital-buddy/vital-buddy";

export default function Page() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4 font-sans relative" 
      style={{ 
        background: "#e3f2fd",
        backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beachimg-Rw4sY4UdNvudI1bGDZQt74wHaFdctA.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "lighten"
      }}
    >
      {/* Subtle overlay to preserve readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(227, 242, 253, 0.75)" }} />
      
      <div className="w-full max-w-sm relative z-10">
        <VitalBuddy />
      </div>
    </main>
  );
}
