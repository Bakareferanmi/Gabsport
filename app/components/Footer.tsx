export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-400 flex justify-between">
        <span>© {new Date().getFullYear()} gabsport</span>
        <span>Built by BeepeeLabs</span>
      </div>
    </footer>
  );
}
