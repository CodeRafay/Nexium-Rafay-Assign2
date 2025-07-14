"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SummaryCard from '../components/SummaryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function Summary({ searchParams }) {
  const [fullText, setFullText] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processBlog = async () => {
      try {
        console.log('Search params:', searchParams); // Debug: Log searchParams
        const url = decodeURIComponent(searchParams?.url || '');
        const fullText = decodeURIComponent(searchParams?.full_text || '');
        if (!url || !fullText) {
          throw new Error('Missing URL or full text in query parameters');
        }
        setFullText(fullText);

        // Summarize text
        const summaryResponse = await fetch('/api/summariseText', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: fullText }),
        });
        if (!summaryResponse.ok) {
          throw new Error(`Summarize API failed: ${summaryResponse.statusText}`);
        }
        const summaryData = await summaryResponse.json();
        if (summaryData.error) throw new Error(summaryData.error);
        setSummaryEn(summaryData.summary);

        // Translate to Urdu
        const translateResponse = await fetch('/api/translateToUrdu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: summaryData.summary }),
        });
        if (!translateResponse.ok) {
          throw new Error(`Translate API failed: ${translateResponse.statusText}`);
        }
        const translateData = await translateResponse.json();
        if (translateData.error) throw new Error(translateData.error);
        setSummaryUrdu(translateData.translated);

        // Save data
        const saveResponse = await fetch('/api/saveData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blog_url: url,
            summary_en: summaryData.summary,
            summary_urdu: translateData.translated,
            full_text: fullText,
          }),
        });
        if (!saveResponse.ok) {
          throw new Error(`Save API failed: ${saveResponse.statusText}`);
        }
        const saveData = await saveResponse.json();
        if (saveData.error) throw new Error(saveData.error);
        setSaveStatus('Data saved successfully!');
      } catch (err) {
        console.error('Summary page error:', err); // Debug: Log error
        setError(err.message || 'An error occurred while processing the blog.');
      } finally {
        setLoading(false);
      }
    };

    processBlog();
  }, [searchParams]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-2xl mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">Blog Summary</CardTitle>
        </CardHeader>
      </Card>
      <SummaryCard
        fullText={fullText}
        summaryEn={summaryEn}
        summaryUrdu={summaryUrdu}
        saveStatus={saveStatus}
      />
    </div>
  );
}