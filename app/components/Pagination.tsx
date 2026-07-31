import Link from 'next/link';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      <Link
        href={`/?page=${Math.max(currentPage - 1, 1)}`}
        aria-disabled={currentPage === 1}
        className={`px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-300 ${
          currentPage === 1 ? 'pointer-events-none opacity-40' : 'hover:border-black dark:hover:border-white'
        }`}
      >
        Prev
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`/?page=${p}`}
          className={`px-3 py-2 text-sm rounded-lg border ${
            p === currentPage
              ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
              : 'border-gray-200 dark:border-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white'
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`/?page=${Math.min(currentPage + 1, totalPages)}`}
        aria-disabled={currentPage === totalPages}
        className={`px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-300 ${
          currentPage === totalPages ? 'pointer-events-none opacity-40' : 'hover:border-black dark:hover:border-white'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
