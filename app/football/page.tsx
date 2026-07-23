import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

export default function Football() {
  const filtered = articles.filter((a) => a.category === 'Football');
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Football</h1>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
