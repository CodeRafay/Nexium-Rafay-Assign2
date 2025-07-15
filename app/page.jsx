import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import URLInputForm from './components/URLInputForm';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 dark:bg-purple-800/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-pink-200/30 dark:bg-pink-800/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-sm">
            Blog Summariser
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform lengthy blog posts into concise summaries with AI-powered analysis. Get insights in English and Urdu.
          </p>
        </div>

        <Card className="w-full max-w-lg glass-morphism border-2 border-purple-200/50 dark:border-purple-800/50 shadow-2xl animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Enter Blog URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <URLInputForm />
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full animate-slide-up">
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
              <svg className="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get summaries in seconds with our optimized AI processing</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
              <svg className="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Dual Language</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Summaries available in both English and Urdu</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
              <svg className="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">High Accuracy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered analysis ensures key insights are captured</p>
          </div>
        </div>
      </div>
    </div>
  );
}