import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path, body } = await request.json();

    const n8nBaseUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    console.log('[v0] n8nBaseUrl:', n8nBaseUrl);
    
    if (!n8nBaseUrl || n8nBaseUrl.includes('YOUR-INSTANCE')) {
      console.error('[v0] Webhook URL not configured');
      return NextResponse.json(
        {
          type: 'error',
          message: 'Webhook URL not configured',
        },
        { status: 400 }
      );
    }

    const url = `${n8nBaseUrl}${path}`;
    console.log(`[v0] Proxying webhook to: ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log(`[v0] Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[v0] Webhook response error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[v0] Webhook response received');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[v0] Webhook proxy error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[v0] Error details:', errorMessage);
    return NextResponse.json(
      {
        type: 'error',
        message:
          'I'm having trouble connecting right now. If this is a life-threatening emergency, please dial 911 or go to the nearest ER. Otherwise, try again in a moment.',
      },
      { status: 500 }
    );
  }
}
