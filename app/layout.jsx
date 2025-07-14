import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Summariser',
  description: 'A web app to scrape, summarize, and translate blog content.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}