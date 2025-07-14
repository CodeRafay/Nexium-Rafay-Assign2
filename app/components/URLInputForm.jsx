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
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        type="url"
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? <LoadingSpinner /> : 'Summarize Blog'}
      </Button>
      {error && <Alert variant="destructive">{error}</Alert>}
    </form>
  );
}