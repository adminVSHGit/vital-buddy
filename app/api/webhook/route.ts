import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path, body } = await request.json();

    const n8nBaseUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!n8nBaseUrl) {
      return NextResponse.json(
        { type: "error", message: "Webhook URL not configured" },
        { status: 400 }
      );
    }

    const url = `${n8nBaseUrl}${path}`;
    console.log("[v0] Calling n8n webhook:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("[v0] n8n error response:", response.status, errorText);
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Webhook proxy error]:", err);
    return NextResponse.json(
      {
        type: "error",
        message:
          "I am having trouble connecting right now. If this is a life-threatening emergency, please dial 911 or go to the nearest ER. Otherwise, try again in a moment.",
      },
      { status: 500 }
    );
  }
}
