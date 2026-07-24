import Link from 'next/link';
import { Article, footballSubcategories } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?category=Football`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Football() {
  const articles = await getArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Football</h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {footballSubcategories.map((s) => (
          <Link
            key={s.slug}
            href={`/football/${s.slug}`}
            className="text-xs uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2 text-gray-600 hover:border-black hover:text-black transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
