import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiKeyConfigured: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'not configured',
    isPlaceholder: apiKey === 'your_openai_api_key_here',
    renderDeploy: process.env.RENDER ? 'true' : 'false'
  });
}
