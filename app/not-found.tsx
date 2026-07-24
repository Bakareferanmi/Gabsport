import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-semibold mb-4">404</h1>
      <p className="text-gray-500 mb-8">This page doesn't exist, or the article may have been moved.</p>
      <Link href="/" className="inline-block bg-black text-white rounded-lg px-6 py-3 font-medium">
        Back to gabsport
      </Link>
    </div>
  );
}
