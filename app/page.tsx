import { articles } from './data/articles';
import ArticleCard from './components/ArticleCard';

export default function Home() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-20">
        <span className="text-xs uppercase tracking-widest text-gray-400">{featured.category}</span>
        <h1 className="text-4xl md:text-5xl font-semibold mt-3 leading-tight">
          {featured.title}
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl">{featured.excerpt}</p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Latest</h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
