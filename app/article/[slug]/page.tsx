import { Article } from '../../data/articles';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ShareButton from '../../components/ShareButton';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article not found | gabsport' };

  return {
    title: `${article.title} | gabsport`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{article.category}</span>
        <ShareButton title={article.title} excerpt={article.excerpt} />
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-tight dark:text-white">{article.title}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-400 mt-4">{article.author} · {formatDate(article.date)}</p>

      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden my-8 bg-gray-100 dark:bg-gray-900">
        <Image src={article.image} alt={article.title} fill className="object-contain" />
      </div>

      <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-4">
        {article.content.split('\n').map((line, i) =>
          line.trim().startsWith('>') ? (
            <blockquote key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
              {line.trim().replace(/^>\s*/, '')}
            </blockquote>
          ) : line.trim() ? (
            <p key={i}>{line}</p>
          ) : null
        )}
      </div>
    </div>
  );
}
