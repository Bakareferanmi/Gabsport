export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
      <div className="h-8 w-32 bg-gray-100 rounded mb-6" />
      <div className="flex flex-wrap gap-2 mb-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-100 rounded-full" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4" />
            <div className="h-3 w-16 bg-gray-100 rounded mb-2" />
            <div className="h-5 w-3/4 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
