import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          gabsport
        </Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/football" className="hover:text-black transition-colors">Football</Link>
          <Link href="/basketball" className="hover:text-black transition-colors">Basketball</Link>
          <Link href="/more" className="hover:text-black transition-colors">More</Link>
        </div>
      </div>
    </nav>
  );
}
