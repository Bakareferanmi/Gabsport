import { Article } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function More() {
  const articles = await getArticles();
  const other = articles.filter(
    (a) => a.category !== 'Football' && a.category !== 'Basketball'
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">More</h1>
      {other.length === 0 ? (
        <p className="text-gray-400">More stories coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {other.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
