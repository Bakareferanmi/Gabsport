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
      <h1 className="text-3xl font-semibold mt-3 mb-10">{match.label}</h1>

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
