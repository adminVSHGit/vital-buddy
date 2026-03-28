"use client";

import { useState, useEffect } from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  content_url: string;
  duration_mins: number;
  category: string;
  thumbnail_url?: string;
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

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function getVimeoThumbnail(vimeoId: string): string {
  return `https://vumbnail.com/${vimeoId}.jpg`;
}

function TypeIcon({ type }: { type: string }) {
  if (type === "breathing" || type === "audio") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-11v6l5-3z" />
      </svg>
    );
  }
  if (type === "video") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
      </svg>
    );
  }
  if (type === "story") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export function ResourceDrawer({ isOpen, onClose }: ResourceDrawerProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && resources.length === 0) {
      setLoading(true);
      fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/resources", body: {} }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.resources && Array.isArray(data.resources)) {
            setResources(data.resources);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen, resources.length]);

  const filtered =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <div>
            <p className="text-base font-medium">Resources</p>
            <p className="text-xs" style={{ color: "var(--foreground-ghost)" }}>
              Videos and exercises to help right now
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            aria-label="Close resources"
          >
            <svg
              width="16"
              height="16"
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

        <div className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all shrink-0"
              style={{
                background: activeCategory === cat.id ? "var(--brand-light)" : "#f5f5f5",
                color: activeCategory === cat.id ? "var(--brand)" : "var(--foreground-subtle)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm" style={{ color: "var(--foreground-ghost)" }}>
                Loading resources...
              </p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: "var(--foreground-ghost)" }}>
                Resources coming soon. Your Vital Buddy can suggest exercises during the conversation — just ask about stress relief, sleep, or guilt.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-1">
            {filtered.map((r) => {
              const vimeoId = getVimeoId(r.content_url);
              const thumbnail = vimeoId ? getVimeoThumbnail(vimeoId) : r.thumbnail_url;
              const isPlaying = playingId === r.id;

              return (
                <div key={r.id} className="rounded-lg overflow-hidden bg-white">
                  {isPlaying && vimeoId ? (
                    <div style={{ aspectRatio: "16/9" }}>
                      <iframe
                        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&badge=0&autopause=0`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin"
                        style={{ display: "block" }}
                        title={r.title}
                      />
                    </div>
                  ) : (
                    <>
                      {thumbnail && (
                        <div
                          style={{
                            position: "relative",
                            aspectRatio: "16/9",
                            background: "#f0f0f0",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={thumbnail}
                            alt={r.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            onClick={() => setPlayingId(r.id)}
                            className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors"
                            aria-label={`Play ${r.title}`}
                          >
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                              style={{ background: "var(--brand)" }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  <div className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span style={{ color: "var(--brand)" }}>
                            <TypeIcon type={r.type} />
                          </span>
                          <p className="text-sm font-medium truncate">{r.title}</p>
                        </div>
                        <p
                          className="text-xs leading-relaxed mb-1.5"
                          style={{ color: "var(--foreground-subtle)" }}
                        >
                          {r.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              background: "#f5f5f5",
                              color: "var(--foreground-ghost)",
                            }}
                          >
                            {r.duration_mins} min
                          </span>
                          {isPlaying && (
                            <button
                              onClick={() => setPlayingId(null)}
                              className="text-xs px-2 py-0.5 rounded"
                              style={{ background: "#f5f5f5", color: "var(--foreground-ghost)" }}
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
