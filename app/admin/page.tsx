'use client';

import { useState } from 'react';

export default function Admin() {
  const [secret, setSecret] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Football');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('Feranmi Bakare');
  const [status, setStatus] = useState('');

  async function handleSubmit() {
    setStatus('Publishing...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({ title, excerpt, content, category, image, author }),
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
    } catch (err) {
      setStatus(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-8">Publish an Article</h1>

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Admin password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Excerpt (short summary)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />
        <textarea
          placeholder="Full content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        >
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="More">More</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white rounded-lg px-4 py-3 font-medium"
        >
          Publish
        </button>

        {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}
      </div>
    </div>
  );
}
