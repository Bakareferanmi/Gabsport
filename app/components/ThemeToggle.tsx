'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gabsport-theme');
    const isDark = stored === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('gabsport-theme', next ? 'dark' : 'light');
  }

  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="text-gray-600 dark:text-gray-300">
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
