"use client";

import { useState } from "react";

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESOURCES = [
  { id: "1", title: "Relaxation", description: "Release tension you didn't know you were holding.", duration: "5 min", vimeoId: "1178026091" },
  { id: "2", title: "Releasing Guilt", description: "A quick exercise to reframe and release guilt.", duration: "5 min", vimeoId: "1178023823" },
  { id: "3", title: "Self-Compassion for Residents", description: "Why being hard on yourself after a mistake makes the next one more likely.", duration: "6 min", vimeoId: "1178023823" },
  { id: "4", title: "Wind-Down Breathing for Sleep", description: "Extended exhale pattern that activates your parasympathetic nervous system.", duration: "3 min", vimeoId: "1178026630" },
  { id: "5", title: "Post-Night-Float Recovery", description: "How to reset your circadian rhythm after nights.", duration: "8 min", vimeoId: "1178026630" },
  { id: "6", title: "Body Scan for Insomnia", description: "Can't turn off your brain after a shift? This was designed for exactly that.", duration: "10 min", vimeoId: "1178026630" },
  { id: "7", title: "Ready and Empowered", description: "Powerful grounding technique. Pulls you out of your head and back into your values.", duration: "2 min", vimeoId: "1178027075" },
];

export function ResourceDrawer({ isOpen, onClose }: ResourceDrawerProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", background: "#ffffff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #e8e8e8" }}>
        <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#1a1a2e" }}>Resources</h2>
        <button
          onClick={() => { setPlayingId(null); onClose(); }}
          style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888", lineHeight: 1 }}
          aria-label="Close resources"
        >
          &times;
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {RESOURCES.map((resource) => (
          <div key={resource.id} style={{ borderRadius: "10px", overflow: "hidden", background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            {playingId === resource.id ? (
              <div style={{ position: "relative", height: "200px" }}>
                <iframe
                  src={`https://player.vimeo.com/video/${resource.vimeoId}?autoplay=1&badge=0&autopause=0`}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setPlayingId(resource.id)}
                style={{ width: "100%", padding: 0, border: "none", background: "none", cursor: "pointer", display: "block", textAlign: "left" }}
                aria-label={`Play ${resource.title}`}
              >
                <div style={{ position: "relative", height: "200px", background: "#000" }}>
                  <img
                    src={`https://vumbnail.com/${resource.vimeoId}.jpg`}
                    alt={resource.title}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                        <path d="M5 3.5L13 8L5 12.5V3.5Z" fill="#1a1a2e" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )}
            <div style={{ padding: "10px 12px" }}>
              <p style={{ margin: "0 0 3px 0", fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>{resource.title}</p>
              <p style={{ margin: "0 0 4px 0", fontSize: "11px", color: "#666", lineHeight: 1.4 }}>{resource.description}</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#999" }}>{resource.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
