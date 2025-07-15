"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const [currentStep, setCurrentStep] = useState('scraping');

  useEffect(() => {
    const processBlog = async () => {
      try {
        console.log('Search params:', searchParams);
        const url = decodeURIComponent(searchParams?.url || '');
        const fullText = decodeURIComponent(searchParams?.full_text || '');
        if (!url || !fullText) {
          throw new Error('Missing URL or full text in query parameters');
        }
        setFullText(fullText);
        setCurrentStep('summarizing');

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
        setCurrentStep('translating');

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
        setCurrentStep('saving');

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
        setCurrentStep('complete');
      } catch (err) {
        console.error('Summary page error:', err);
        setError(err.message || 'An error occurred while processing the blog.');
      } finally {
        setLoading(false);
      }
    };

    processBlog();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 dark:bg-purple-800/20 rounded-full animate-float blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-md glass-morphism border-2 border-purple-200/50 dark:border-purple-800/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center">
                <LoadingSpinner />
                <h2 className="text-2xl font-semibold mt-4 mb-2">Processing Blog</h2>
                <p className="text-muted-foreground capitalize">
                  {currentStep === 'scraping' && 'Extracting content...'}
                  {currentStep === 'summarizing' && 'Generating summary...'}
                  {currentStep === 'translating' && 'Translating to Urdu...'}
                  {currentStep === 'saving' && 'Saving results...'}
                  {currentStep === 'complete' && 'Complete!'}
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: currentStep === 'scraping' ? '25%' : 
                             currentStep === 'summarizing' ? '50%' : 
                             currentStep === 'translating' ? '75%' : 
                             currentStep === 'saving' ? '90%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-900/20 dark:via-gray-900 dark:to-orange-900/20"></div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <ErrorAlert message={error} />
          <Button 
            onClick={() => window.location.href = '/'} 
            className="mt-4 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-900/20 dark:via-gray-900 dark:to-blue-900/20"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/30 dark:bg-green-800/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-4 drop-shadow-sm">
              Summary Complete
            </h1>
            <p className="text-lg text-muted-foreground">
              Your blog has been analyzed and summarized successfully
            </p>
          </div>

          <div className="animate-slide-up">
            <SummaryCard
              fullText={fullText}
              summaryEn={summaryEn}
              summaryUrdu={summaryUrdu}
              saveStatus={saveStatus}
            />
          </div>

          <div className="text-center mt-8 animate-fade-in">
            <Button 
              onClick={() => window.location.href = '/'} 
              className="bg-gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg"
            >
              Summarize Another Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}