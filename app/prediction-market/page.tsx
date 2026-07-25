import { Article } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?category=Prediction Market`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PredictionMarket() {
  const articles = await getArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-3">Prediction Market</h1>
      <p className="text-xs text-gray-400 mb-10">
        Analysis and coverage of sports prediction markets. For informational purposes only.
      </p>

      {articles.length === 0 ? (
        <p className="text-gray-400">No articles yet. Check back soon.</p>
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
