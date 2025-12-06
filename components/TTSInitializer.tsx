'use client';

// Use the official TTSInitializer from the supernal-tts-widget package
// Note: CSS is loaded automatically by the component, no need to import it
import TTSInitializer from 'supernal-tts-widget/react';

export default function TTSInit() {
  return (
    <TTSInitializer
      apiUrl={process.env.NEXT_PUBLIC_TTS_API_URL || 'https://tts.supernal.ai'}
      apiKey={process.env.NEXT_PUBLIC_TTS_API_KEY || ''}
      provider="openai"
      voice="alloy"
      speed={1.0}
      clientSideSpeed={true}
      showBranding={true}
    />
  );
}
