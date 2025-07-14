import { load } from 'cheerio';
import axios from 'axios';

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch the blog page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000,
    });
    const html = response.data;

    // Parse HTML with cheerio
    const $ = load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, .advertisement, .newsletter-signup, .related-links').remove();

    // Extract text from The Verge-specific selectors
    const blogText = $('article, .c-entry-content, .c-post-body, p')
      .map((i, el) => $(el).text().trim())
      .get()
      .filter(text => text.length > 20 && !text.includes('Sign Up') && !text.includes('Privacy Policy'))
      .join(' ');

    if (!blogText || blogText.length < 50) {
      return new Response(JSON.stringify({ error: 'No meaningful content found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ full_text: blogText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Scraping error:', {
      message: error.message,
      url,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });
    return new Response(JSON.stringify({ error: `Failed to scrape blog: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}