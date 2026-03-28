// ============================================================
// Vital Buddy — n8n Webhook API Service
// ============================================================
// Update N8N_BASE with your n8n Cloud instance URL.
// After importing the workflow JSON and activating it,
// three endpoints are live automatically.
// ============================================================

const N8N_BASE =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://YOUR-INSTANCE.app.n8n.cloud/webhook";

export const isConnected = () => !N8N_BASE.includes("YOUR-INSTANCE");

// Anonymous token — persisted in sessionStorage per device
let _token: string | null = null;
export function getAnonToken(): string {
  if (_token) return _token;
  if (typeof window !== "undefined") {
    try {
      _token = sessionStorage.getItem("vb_token");
      if (!_token) {
        _token = crypto.randomUUID();
        sessionStorage.setItem("vb_token", _token);
      }
    } catch {
      _token = crypto.randomUUID();
    }
  } else {
    _token = crypto.randomUUID();
  }
  return _token;
}

export interface N8NResponse {
  type: "opening" | "chat" | "closing" | "escalation" | "crisis_screen" | "error";
  message?: string;
  output?: string;
  filtered?: boolean;
  persona_suspended?: boolean;
  static_content?: {
    heading: string;
    body: string;
    resources: { label: string; description?: string; action?: string }[];
    closing: string;
  };
  opening_score?: number;
  closing_score?: number;
  delta?: number;
  persistent_footer?: {
    text: string;
    links: { support: string; terms: string; crisis: string };
  };
}

async function callWebhook(path: string, body: Record<string, unknown>): Promise<N8NResponse> {
  const url = `${N8N_BASE}${path}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`n8n webhook failed (${path}):`, err);
    return {
      type: "error",
      message:
        "I'm having trouble connecting right now. If this is a life-threatening emergency, please dial 911 or go to the nearest ER. Otherwise, try again in a moment.",
    };
  }
}

// === Session Start ===
export async function startSession(mode: string, sessionId: string) {
  return callWebhook("/session-start", {
    anonymous_token: getAnonToken(),
    mode,
    session_id: sessionId,
    device_context: {
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      ts: new Date().toISOString(),
    },
  });
}

// === Chat Message (also handles stress score submission) ===
export interface ChatMessagePayload {
  sessionId: string;
  message: string;
  openingScore: number;
  mode: string;
  history: { role: string; content: string }[];
}

export async function sendMessage(payload: ChatMessagePayload) {
  return callWebhook("/session-message", {
    anonymous_token: getAnonToken(),
    session_id: payload.sessionId,
    message: payload.message,
    opening_score: payload.openingScore,
    mode: payload.mode,
    history: payload.history,
  });
}

// === Session Close ===
export async function closeSession(
  sessionId: string,
  openingScore: number,
  closingScore: number,
  mode: string
) {
  return callWebhook("/session-close", {
    anonymous_token: getAnonToken(),
    session_id: sessionId,
    opening_score: openingScore,
    closing_score: closingScore,
    mode,
  });
}
