'use client';

import { useEffect, useState } from 'react';

type Match = {
  id: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: { fullTime: { home: number | null; away: number | null } };
  competition: { name: string };
  status: string;
};

export default function LiveScores() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/live-scores`);
      const data = await res.json();
      setMatches(Array.isArray(data) ? data : []);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Live Scores</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-400">No live matches right now.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((m) => (
            <div key={m.id} className="border border-gray-100 rounded-lg p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {m.competition.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">{m.homeTeam.name}</span>
                <span className="text-lg font-semibold">
                  {m.score.fullTime.home ?? 0} - {m.score.fullTime.away ?? 0}
                </span>
                <span className="font-medium">{m.awayTeam.name}</span>
              </div>
              <p className="text-xs text-red-500 mt-2">● Live</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
