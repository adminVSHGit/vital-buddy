"use client";

import { useState, useEffect } from "react";

const RESOURCES = [
  {
    id: "1",
    title: "Relaxation",
    description: "Release tension you didn't know you were holding. Especially good after a long shift.",
    duration_mins: 5,
    vimeo_id: "1178026091"
  },
  {
    id: "2",
    title: "Releasing Guilt",
    description: "A quick exercise to reframe and release guilt.",
    duration_mins: 5,
    vimeo_id: "1178023823"
  },
  {
    id: "3",
    title: "Self-Compassion for Residents",
    description: "Why being hard on yourself after a mistake makes the next one more likely, not less.",
    duration_mins: 6,
    vimeo_id: "1178023823"
  },
  {
    id: "4",
    title: "Wind-Down Breathing for Sleep",
    description: "Extended exhale pattern (4-7-8) that activates your parasympathetic nervous system before bed.",
    duration_mins: 3,
    vimeo_id: "1178026630"
  },
  {
    id: "5",
    title: "Post-Night-Float Recovery Guide",
    description: "How to reset your circadian rhythm after nights. Practical tips from residents who figured it out.",
    duration_mins: 8,
    vimeo_id: "1178026630"
  },
  {
    id: "6",
    title: "Body Scan for Insomnia",
    description: "Can't turn off your brain after a shift? This body scan was designed for exactly that.",
    duration_mins: 10,
    vimeo_id: "1178026630"
  },
  {
    id: "7",
    title: "Ready and Empowered",
    description: "Powerful grounding technique. Pulls you out of your head and back into your values, preparing you for what's next.",
    duration_mins: 2,
    vimeo_id: "1178027075"
  }
];

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceDrawer({ isOpen, onClose }: ResourceDrawerProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: "1rem",
        overflow: "hidden"
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          Wellness Resources
        </h2>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-sm rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "var(--surface-secondary)", color: "var(--foreground)" }}
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {RESOURCES.map((resource) => (
          <div
            key={resource.id}
            className="rounded-lg p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="relative mb-3 bg-gray-900 rounded-lg overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              {playingId === resource.id ? (
                <iframe
                  src={`https://player.vimeo.com/video/${resource.vimeo_id}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              ) : (
                <>
                  <img
                    src={`https://vumbnail.com/${resource.vimeo_id}.jpg`}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setPlayingId(resource.id)}
                    className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255, 255, 255, 0.9)" }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "#000" }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                </>
              )}
            </div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
              {resource.title}
            </h3>
            <p className="text-xs mb-2" style={{ color: "var(--foreground-ghost)" }}>
              {resource.description}
            </p>
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {resource.duration_mins} min
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
