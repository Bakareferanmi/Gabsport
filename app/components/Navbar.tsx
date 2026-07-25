'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const menuLinks = [
  { href: '/live-scores', label: 'Live Scores' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/results', label: 'Results' },
  { href: '/table', label: 'League Table' },
  { href: '/betting-tips', label: 'Betting Tips' },
  { href: '/prediction-market', label: 'Prediction Market' },
  { href: '/more', label: 'More' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0 -ml-3">
          <Image src="/logo.png" alt="gabsport" width={64} height={64} className="object-contain" />
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link
            href="/football"
            className={`transition-colors ${pathname.startsWith('/football') ? 'text-black font-medium' : 'hover:text-black'}`}
          >
            Football
          </Link>
          <Link
            href="/basketball"
            className={`transition-colors ${pathname.startsWith('/basketball') ? 'text-black font-medium' : 'hover:text-black'}`}
          >
            Basketball
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm text-gray-600">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition-colors ${pathname === link.href ? 'text-black font-medium' : 'hover:text-black'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
