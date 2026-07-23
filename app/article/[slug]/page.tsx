import { articles } from '../../data/articles';
import Image from 'next/image';
import { notFound } from 'next/navigation';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs uppercase tracking-widest text-gray-400">{article.category}</span>
      <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-tight">{article.title}</h1>
      <p className="text-sm text-gray-400 mt-4">{article.author} · {formatDate(article.date)}</p>

      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden my-8">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
      </div>

      <p className="text-gray-700 leading-relaxed">{article.content}</p>
    </div>
  );
}
