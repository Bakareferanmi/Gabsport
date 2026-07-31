import Link from 'next/link';
import ArticleCard from './components/ArticleCard';
import { Article } from './data/articles';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-400">
          We're having trouble loading articles right now. Please check back shortly.
        </p>
      </div>
    );
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-20">
        <Link href={`/article/${featured.slug}`} className="group block">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{featured.category}</span>
          <h1 className="text-4xl md:text-5xl font-semibold mt-3 leading-tight dark:text-white group-hover:underline">
            {featured.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl">{featured.excerpt}</p>
        </Link>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Latest</h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
