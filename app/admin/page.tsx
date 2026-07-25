'use client';

import { useState, useRef, useEffect } from 'react';
import { footballSubcategories, Article } from '../data/articles';

export default function Admin() {
  const [secret, setSecret] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Football');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('Feranmi Bakare');
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  async function loadArticles() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch {
      setArticles([]);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus('Uploading image...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'gabsport_uploads');

      const res = await fetch('https://api.cloudinary.com/v1_1/jhayatelier/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        setStatus(`Image upload failed: ${res.status} — ${errText}`);
        setUploading(false);
        return;
      }

      const data = await res.json();
      setImage(data.secure_url);
      setStatus('Image uploaded.');
    } catch (err) {
      setStatus(`Image upload error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(false);
    }
  }

  function insertQuote() {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || 'Quote text here';
    const before = content.slice(0, start);
    const after = content.slice(end);

    const newContent = `${before}\n> ${selected}\n${after}`;
    setContent(newContent);

    setTimeout(() => textarea.focus(), 0);
  }

  async function handleSubmit() {
    setStatus('Publishing...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          subcategory: category === 'Football' ? subcategory : null,
          image,
          author,
        }),
      });

      if (res.status === 401) {
        setStatus('Wrong password.');
        return;
      }
      if (!res.ok) {
        const errText = await res.text();
        setStatus(`Error ${res.status}: ${errText}`);
        return;
      }

      const data = await res.json();
      setStatus(`Published: ${data.title}`);
      setTitle('');
      setExcerpt('');
      setContent('');
      setImage('');
      setSubcategory('');
      loadArticles();
    } catch (err) {
      setStatus(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async function handleDelete(slug: string) {
    if (!secret) {
      setStatus('Enter admin password first.');
      return;
    }
    if (!confirm('Delete this article? This cannot be undone.')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': secret },
      });

      if (res.status === 401) {
        setStatus('Wrong password.');
        return;
      }
      if (!res.ok) {
        setStatus('Delete failed.');
        return;
      }

      setStatus('Article deleted.');
      loadArticles();
    } catch {
      setStatus('Network error while deleting.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-8 dark:text-white">Publish an Article</h1>

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Admin password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Excerpt (short summary)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
        />

        <div>
          <button
            type="button"
            onClick={insertQuote}
            className="text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-700 dark:text-gray-300 rounded-full px-3 py-1.5 mb-2 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors"
          >
            + Add Quote
          </button>
          <textarea
            ref={contentRef}
            placeholder="Full content (use the button above to insert a quote)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
        >
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Betting Tips">Betting Tips</option>
          <option value="Prediction Market">Prediction Market</option>
          <option value="More">More</option>
        </select>

        {category === 'Football' && (
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
          >
            <option value="">Select subsection</option>
            {footballSubcategories.map((s) => (
              <option key={s.slug} value={s.slug}>{s.label}</option>
            ))}
          </select>
        )}

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Article Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-black file:text-white dark:file:bg-white dark:file:text-black file:cursor-pointer hover:file:opacity-90"
          />
          {image && (
            <img src={image} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg" />
          )}
          <input
            type="text"
            placeholder="Or paste image URL directly"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3 mt-2"
          />
        </div>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-4 py-3"
        />

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-black dark:bg-white text-white dark:text-black rounded-lg px-4 py-3 font-medium"
        >
          Publish
        </button>

        {status && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{status}</p>}
      </div>

      <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-8">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Manage Articles</h2>
        <div className="space-y-3">
          {articles.map((a) => (
            <div key={a.slug} className="flex items-center justify-between border border-gray-100 dark:border-gray-800 rounded-lg px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">{a.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{a.category}</p>
              </div>
              <button
                onClick={() => handleDelete(a.slug)}
                className="text-xs text-red-500 hover:text-red-700 shrink-0 ml-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
