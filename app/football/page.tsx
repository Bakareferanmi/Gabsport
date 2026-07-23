const articles = [
  { title: "Transfer Window Winners and Losers", excerpt: "A breakdown of who strengthened their squad and who missed the mark this window." },
  { title: "Rising Stars to Watch This Season", excerpt: "Five young players making a name for themselves across Europe's top leagues." },
];

export default function Football() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Football</h1>
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
