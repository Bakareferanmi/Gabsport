import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PushSubscribe from './components/PushSubscribe';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'gabsport',
  description: 'Your daily sports coverage, reactions, and analysis.',
  openGraph: {
    title: 'gabsport',
    description: 'Your daily sports coverage, reactions, and analysis.',
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'gabsport',
    description: 'Your daily sports coverage, reactions, and analysis.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans text-gray-900 antialiased bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <PushSubscribe />
      </body>
    </html>
  );
}
