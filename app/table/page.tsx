'use client';

import { useEffect, useState } from 'react';

const leagues = [
  { code: 'PL', label: 'EPL' },
  { code: 'PD', label: 'La Liga' },
  { code: 'SA', label: 'Serie A' },
  { code: 'BL1', label: 'Bundesliga' },
  { code: 'FL1', label: 'Ligue 1' },
];

export default function LeagueTable() {
  const [league, setLeague] = useState('PL');
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/standings?competition=${league}`)
      .then((res) => res.json())
      .then((data) => {
        setStandings(data?.standings?.[0]?.table || []);
      })
      .catch(() => setStandings([]))
      .finally(() => setLoading(false));
  }, [league]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">League Table</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {leagues.map((l) => (
          <button
            key={l.code}
            onClick={() => setLeague(l.code)}
            className={`text-xs uppercase tracking-widest border rounded-full px-4 py-2 transition-colors ${
              league === l.code ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : standings.length === 0 ? (
        <p className="text-gray-400">No table data available.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="py-2">#</th>
              <th className="py-2">Team</th>
              <th className="py-2 text-center">P</th>
              <th className="py-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s: any) => (
              <tr key={s.team.id} className="border-b border-gray-50">
                <td className="py-2">{s.position}</td>
                <td className="py-2">{s.team.name}</td>
                <td className="py-2 text-center">{s.playedGames}</td>
                <td className="py-2 text-center font-medium">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
