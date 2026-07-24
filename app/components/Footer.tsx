import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-400">
        <span>© {new Date().getFullYear()} gabsport</span>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link>
        </div>
        <span>Built by BeepeeLabs</span>
      </div>
    </footer>
  );
}
