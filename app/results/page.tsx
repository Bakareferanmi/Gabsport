export default async function Results() {
  let matches: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results`, {
      next: { revalidate: 300 },
    });
    if (res.ok) matches = await res.json();
  } catch {
    matches = [];
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Results</h1>

      {matches.length === 0 ? (
        <p className="text-gray-400">No recent results available.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((m: any) => (
            <div key={m.id} className="border border-gray-100 rounded-lg p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {m.competition.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">{m.homeTeam.name}</span>
                <span className="text-lg font-semibold">
                  {m.score.fullTime.home} - {m.score.fullTime.away}
                </span>
                <span className="font-medium">{m.awayTeam.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
