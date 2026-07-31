import Link from 'next/link';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import { Article } from './data/articles';
import { smartCrop } from './lib/cloudinary';

type ArticlesResponse = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
};

const PAGE_SIZE = 7; // 1 hero + 6 grid on page 1

async function getArticles(page: number): Promise<ArticlesResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${page}&limit=${PAGE_SIZE}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { articles: [], currentPage: 1, totalPages: 1, totalArticles: 0 };
    return res.json();
  } catch {
    return { articles: [], currentPage: 1, totalPages: 1, totalArticles: 0 };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(parseInt(params.page || '1', 10) || 1, 1);
  const { articles, currentPage, totalPages } = await getArticles(page);

  if (articles.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-400">
          We're having trouble loading articles right now. Please check back shortly.
        </p>
      </div>
    );
  }

  // Hero only shows on page 1
  const featured = currentPage === 1 ? articles[0] : null;
  const rest = currentPage === 1 ? articles.slice(1) : articles;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {featured && (
        <section className="mb-20">
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative w-full h-80 md:h-[28rem] rounded-lg overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={smartCrop(featured.image, 1000, 1000)}
                alt={featured.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{featured.category}</span>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 leading-tight dark:text-white group-hover:underline">
              {featured.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl">{featured.excerpt}</p>
          </Link>
        </section>
      )}

      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Latest</h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
