'use client';

import { useState, useEffect, useCallback } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../data/articles';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles?q=${encodeURIComponent(term)}`
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => runSearch(query), 400);
    return () => clearTimeout(timeout);
  }, [query, runSearch]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="relative mb-12">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          autoFocus
          placeholder="Search articles, players, teams, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg pl-11 pr-4 py-3.5 text-base"
        />
      </div>

      {loading && (
        <p className="text-gray-400 text-sm">Searching...</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-gray-400 text-sm">No articles found for &ldquo;{query}&rdquo;.</p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {results.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
