import { Article } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?category=Basketball`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Basketball() {
  const articles = await getArticles();
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Basketball</h1>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
