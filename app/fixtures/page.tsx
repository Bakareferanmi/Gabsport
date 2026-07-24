function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default async function Fixtures() {
  let matches: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fixtures`, {
      next: { revalidate: 300 },
    });
    if (res.ok) matches = await res.json();
  } catch {
    matches = [];
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Fixtures</h1>

      {matches.length === 0 ? (
        <p className="text-gray-400">No upcoming fixtures scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((m: any) => (
            <div key={m.id} className="border border-gray-100 rounded-lg p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {m.competition.name} · {formatDate(m.utcDate)}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">{m.homeTeam.name}</span>
                <span className="text-sm text-gray-400">vs</span>
                <span className="font-medium">{m.awayTeam.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
