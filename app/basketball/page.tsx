const articles = [
  { title: "NBA Playoff Race Heats Up in the West", excerpt: "Every team in the West still has something to play for as the season winds down." },
  { title: "Behind the Scenes: A Coach's Matchday Routine", excerpt: "What actually happens in the hours before tip-off." },
];

export default function Basketball() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Basketball</h1>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {articles.map((a, i) => (
          <article key={i} className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-medium">{a.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{a.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
