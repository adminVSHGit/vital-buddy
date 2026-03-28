"use client";

import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  vimeoId: string;
  duration_mins: number;
  category: string;
}

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "stress_relief", label: "Stress relief" },
  { id: "guilt", label: "Overcoming guilt" },
  { id: "sleep", label: "Sleep support" },
  { id: "grounding", label: "Grounding" },
];

const RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Relaxation",
    description: "Release tension you didn\u2019t know you were holding. Especially good after a long shift.",
    type: "exercise",
    vimeoId: "1178026091",
    duration_mins: 5,
    category: "stress_relief",
  },
  {
    id: "2",
    title: "Releasing Guilt",
    description: "A quick exercise to reframe and release guilt.",
    type: "exercise",
    vimeoId: "1178023823",
    duration_mins: 5,
    category: "guilt",
  },
  {
    id: "3",
    title: "Self-Compassion for Residents",
    description: "Why being hard on yourself after a mistake makes the next one more likely, not less.",
    type: "video",
    vimeoId: "1178023823",
    duration_mins: 6,
    category: "guilt",
  },
  {
    id: "4",
    title: "Wind-Down Breathing for Sleep",
    description: "Extended exhale pattern (4-7-8) that activates your parasympathetic nervous system.",
    type: "breathing",
    vimeoId: "1178026630",
    duration_mins: 3,
    category: "sleep",
  },
  {
    id: "5",
    title: "Post-Night-Float Recovery",
    description: "How to reset your circadian rhythm after nights. Practical tips from residents.",
    type: "video",
    vimeoId: "1178026630",
    duration_mins: 8,
    category: "sleep",
  },
  {
    id: "6",
    title: "Body Scan for Insomnia",
    description: "Can\u2019t turn off your brain after a shift? This was designed for exactly that.",
    type: "body_scan",
    vimeoId: "1178026630",
    duration_mins: 10,
    category: "sleep",
  },
  {
    id: "7",
    title: "Ready and Empowered",
    description: "Powerful grounding technique. Back into your values, preparing you for what\u2019s next.",
    type: "grounding",
    vimeoId: "1178027075",
    duration_mins: 2,
    category: "grounding",
  },
];

export function ResourceDrawer({ isOpen, onClose }: ResourceDrawerProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered =
    activeCategory === "all"
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === activeCategory);

  const playingResource = playingId
    ? RESOURCES.find((r) => r.id === playingId)
    : null;

  return (
    <>
      {/* Fullscreen video player */}
      {playingResource && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={() => setPlayingId(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Close video"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <p className="text-white text-sm font-medium mb-3">
            {playingResource.title}
          </p>
          <div
            className="w-full max-w-2xl mx-4 rounded-xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${playingResource.vimeoId}?autoplay=1&badge=0&autopause=0`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
          <button
            onClick={() => setPlayingId(null)}
            className="mt-4 px-5 py-2 rounded-lg text-xs text-white cursor-pointer"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            Back to resources
          </button>
        </div>
      )}

      {/* Resource drawer — opaque white */}
      <div
        className="absolute inset-0 z-50 flex flex-col overflow-hidden"
        style={{
          background: "white",
          borderRadius: "inherit",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: "0.5px solid var(--border)" }}
        >
          <div>
            <p className="text-base font-medium">Resources</p>
            <p
              className="text-xs"
              style={{ color: "var(--foreground-ghost)" }}
            >
              Reset, rewind, and rebuild
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "var(--surface-secondary)" }}
            aria-label="Close resources"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category pills */}
        <div
          className="flex gap-2 px-4 py-2.5 overflow-x-auto shrink-0"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background:
                  activeCategory === cat.id
                    ? "var(--brand)"
                    : "var(--surface-secondary)",
                color:
                  activeCategory === cat.id
                    ? "white"
                    : "var(--foreground-subtle)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setPlayingId(r.id)}
                className="text-left rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {/* Vimeo embed as thumbnail — shows first frame of video */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "16/9",
                    background: "#f5f3ef",
                  }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${r.vimeoId}?badge=0&autopause=1&player_id=0&app_id=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ display: "block", pointerEvents: "none" }}
                    loading="lazy"
                    title={r.title}
                  />
                  {/* Play button overlay — clickable */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "auto" }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand)">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div
                    className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-white"
                    style={{ background: "rgba(0,0,0,0.65)", fontSize: "10px", fontWeight: 500, pointerEvents: "none" }}
                  >
                    {r.duration_mins} min
                  </div>
                </div>

                {/* Title + description */}
                <div className="p-2.5">
                  <p className="text-sm font-medium leading-tight mb-0.5">
                    {r.title}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{
                      color: "var(--foreground-ghost)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {r.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p
                className="text-sm"
                style={{ color: "var(--foreground-ghost)" }}
              >
                No resources in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
