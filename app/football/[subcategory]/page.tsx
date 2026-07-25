import Link from 'next/link';
import { Article, footballSubcategories } from '../../data/articles';
import ArticleCard from '../../components/ArticleCard';
import { notFound } from 'next/navigation';

async function getArticles(subcategory: string): Promise<Article[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?category=Football&subcategory=${subcategory}`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export default async function FootballSubcategory({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  const match = footballSubcategories.find((s) => s.slug === subcategory);
  if (!match) return notFound();

  const articles = await getArticles(subcategory);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/football" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Football
      </Link>
      <h1 className="text-3xl font-semibold mt-3 mb-6">{match.label}</h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {footballSubcategories.map((s) => (
          <a
            key={s.slug}
            href={`/football/${s.slug}`}
            className={`text-xs uppercase tracking-widest border rounded-full px-4 py-2 transition-colors ${
              s.slug === subcategory
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {s.label}
          </a>
        ))}
        <span className="w-px bg-gray-200 mx-1" />
        <Link
          href="/betting-tips"
          className="text-xs uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2 text-gray-600 hover:border-black hover:text-black transition-colors"
        >
          Betting Tips
        </Link>
        <Link
          href="/prediction-market"
          className="text-xs uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2 text-gray-600 hover:border-black hover:text-black transition-colors"
        >
          Prediction Market
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-400">No articles yet in this section.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
