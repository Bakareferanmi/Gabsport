import Link from 'next/link';
import Image from 'next/image';
import { Article } from '../data/articles';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block border-b border-gray-100 pb-6">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <span className="text-xs uppercase tracking-widest text-gray-400">{article.category}</span>
      <h3 className="text-lg font-medium mt-2 group-hover:underline">{article.title}</h3>
      <p className="text-gray-500 text-sm mt-2">{article.excerpt}</p>
      <p className="text-xs text-gray-400 mt-3">{article.author} · {formatDate(article.date)}</p>
    </Link>
  );
}
