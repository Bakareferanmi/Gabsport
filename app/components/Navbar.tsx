'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="gabsport" width={160} height={160} className="object-contain -my-6" />
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/football" className="hover:text-black transition-colors">Football</Link>
          <Link href="/basketball" className="hover:text-black transition-colors">Basketball</Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm text-gray-600">
            <Link href="/more" onClick={() => setOpen(false)} className="hover:text-black transition-colors">More</Link>
            <Link href="/privacy-policy" onClick={() => setOpen(false)} className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" onClick={() => setOpen(false)} className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-black transition-colors">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
