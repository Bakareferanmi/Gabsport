import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <Image src="/logo.png" alt="gabsport" width={80} height={80} className="object-contain" />
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</Link>
        </div>
        <span>© {new Date().getFullYear()} gabsport</span>
        <span>Built with ♥️ by BeepeeLabs</span>
      </div>
    </footer>
  );
}
