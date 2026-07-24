'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('gabsport-cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('gabsport-cookie-consent', 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-gray-300">
          We use cookies to improve your experience. By using gabsport, you agree to our{' '}
          <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
        </p>
        <button
          onClick={accept}
          className="bg-white text-black px-5 py-2 rounded-lg font-medium whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
