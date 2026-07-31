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
    <Link href={`/article/${article.slug}`} className="group block border-b border-gray-100 dark:border-gray-800 pb-6">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{article.category}</span>
      <h3 className="text-lg font-medium mt-2 group-hover:underline line-clamp-2 dark:text-white">{article.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{article.author} · {formatDate(article.date)}</p>
    </Link>
  );
}
