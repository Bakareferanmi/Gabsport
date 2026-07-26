import { Article } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?category=Boxing`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Boxing() {
  const articles = await getArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10 dark:text-white">Boxing</h1>

      {articles.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500">No articles yet. Check back soon.</p>
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
