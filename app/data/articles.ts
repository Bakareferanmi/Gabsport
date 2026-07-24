export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string | null;
  image: string;
  author: string;
  date: string;
};

export const footballSubcategories = [
  { label: 'Transfer', slug: 'transfer' },
  { label: 'EPL', slug: 'epl' },
  { label: 'UCL', slug: 'ucl' },
  { label: 'UEL', slug: 'uel' },
  { label: 'La Liga', slug: 'la-liga' },
  { label: 'Serie A', slug: 'serie-a' },
  { label: 'Bundesliga', slug: 'bundesliga' },
  { label: 'Ligue 1', slug: 'ligue-1' },
  { label: 'International Football', slug: 'international-football' },
];
