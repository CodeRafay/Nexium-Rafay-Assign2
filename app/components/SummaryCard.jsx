import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function SummaryCard({ fullText, summaryEn, summaryUrdu, saveStatus }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CopyButton = ({ text, section, className = "" }) => (
    <button
      onClick={() => copyToClipboard(text, section)}
      className={`
        inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium
        bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200
        transition-all duration-200 hover:scale-105 active:scale-95
        border border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      {copiedSection === section ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Original Content Preview */}
      <Card className="glass-morphism border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Original Content
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {fullText.length.toLocaleString()} characters
              </span>
              <CopyButton text={fullText} section="original" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className={`
              prose prose-gray dark:prose-invert max-w-none
              ${expandedSection === 'original' ? '' : 'line-clamp-6'}
              text-gray-700 dark:text-gray-300 leading-relaxed
            `}>
              {fullText}
            </div>
            
            {fullText.length > 500 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'original' ? null : 'original')}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 font-medium"
                >
                  {expandedSection === 'original' ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* English Summary */}
      <Card className="glass-morphism border-2 border-green-200/50 dark:border-green-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M11 9v6m4-6v6" />
              </svg>
              <span>English Summary</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                {summaryEn.length.toLocaleString()} characters
              </span>
              <CopyButton text={summaryEn} section="english" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {summaryEn}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Urdu Summary */}
      <Card className="glass-morphism border-2 border-purple-200/50 dark:border-purple-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>Urdu Summary</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                {summaryUrdu.length.toLocaleString()} characters
              </span>
              <CopyButton text={summaryUrdu} section="urdu" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p 
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-['Noto_Nastaliq_Urdu']"
              dir="rtl"
            >
              {summaryUrdu}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Status */}
      {saveStatus && (
        <div className="animate-slide-up">
          <Card className="glass-morphism border-2 border-green-200/50 dark:border-green-800/50 bg-green-50/80 dark:bg-green-900/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 text-green-700 dark:text-green-300">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm opacity-90">{saveStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}