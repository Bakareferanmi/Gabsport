'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton({ title, excerpt }: { title: string; excerpt: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url });
      } catch {
        // user cancelled, ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share article"
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors shrink-0"
    >
      <Share2 size={18} />
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}
