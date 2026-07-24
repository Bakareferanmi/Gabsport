'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Share2 } from 'lucide-react';
import { Article } from '../../data/articles';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      const { slug } = await params;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);
        if (!res.ok) {
          setArticle(null);
        } else {
          setArticle(await res.json());
        }
      } catch {
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params]);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, text: article?.excerpt, url });
      } catch {
        // user cancelled, ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) return null;
  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs uppercase tracking-widest text-gray-400">{article.category}</span>
        <button
          onClick={handleShare}
          aria-label="Share article"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors shrink-0"
        >
          <Share2 size={18} />
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-tight">{article.title}</h1>
      <p className="text-sm text-gray-400 mt-4">{article.author} · {formatDate(article.date)}</p>

      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden my-8">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
      </div>

      <p className="text-gray-700 leading-relaxed">{article.content}</p>
    </div>
  );
}
