"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Alert } from '../../components/ui/alert';
import LoadingSpinner from './LoadingSpinner';

export default function URLInputForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/scrapeBlog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      router.push(`/summary?url=${encodeURIComponent(url)}&full_text=${encodeURIComponent(data.full_text)}`);
    } catch (err) {
      setError(err.message || 'Failed to scrape blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <Input
            type="url"
            placeholder="https://example.com/blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            className="w-full h-12 px-4 py-3 text-base border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 hover:border-purple-300 dark:hover:border-purple-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            style={{
              backgroundColor: 'white',
              color: '#111827'
            }}
          />
          
          {/* Input icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || !url.trim()}
          className="w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800/50"
        >
          <div className="flex items-center justify-center space-x-2">
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Summarize Blog</span>
              </>
            )}
          </div>
        </Button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="animate-slide-up">
          <Alert className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L5.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </Alert>
        </div>
      )}

      {/* URL format hint */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter a valid blog URL starting with https://
        </p>
      </div>
    </div>
  );
}