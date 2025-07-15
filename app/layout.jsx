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
      <head>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charSet="UTF-8" />
      </head>
      <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <main className="container mx-auto p-4 max-w-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
