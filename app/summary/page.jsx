import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '../components/LoadingSpinner';
import SummaryContent from '../components/SummaryContent';

// Loading fallback component
function SummaryLoading() {
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
              <h2 className="text-2xl font-semibold mt-4 mb-2">Loading Summary</h2>
              <p className="text-muted-foreground">Please wait while we load your summary...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Summary() {
  return (
    <Suspense fallback={<SummaryLoading />}>
      <SummaryContent />
    </Suspense>
  );
}