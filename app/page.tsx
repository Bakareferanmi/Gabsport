const featured = {
  title: "Champions League Final Set: Everything You Need to Know",
  excerpt: "Two giants of European football collide this weekend in a match that could redefine both clubs' legacies.",
  category: "Football",
};

const articles = [
  { title: "Transfer Window Winners and Losers", category: "Football" },
  { title: "NBA Playoff Race Heats Up in the West", category: "Basketball" },
  { title: "Rising Stars to Watch This Season", category: "Football" },
  { title: "Behind the Scenes: A Coach's Matchday Routine", category: "More" },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-20">
        <span className="text-xs uppercase tracking-widest text-gray-400">{featured.category}</span>
        <h1 className="text-4xl md:text-5xl font-semibold mt-3 leading-tight">
          {featured.title}
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl">{featured.excerpt}</p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Latest</h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {articles.map((a, i) => (
            <article key={i} className="border-b border-gray-100 pb-6">
              <span className="text-xs uppercase tracking-widest text-gray-400">{a.category}</span>
              <h3 className="text-lg font-medium mt-2">{a.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
