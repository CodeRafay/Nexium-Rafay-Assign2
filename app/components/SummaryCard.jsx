import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

export default function SummaryCard({ fullText, summaryEn, summaryUrdu, saveStatus }) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Blog Content</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{fullText.slice(0, 500)}...</p>
        <h2 className="text-xl font-bold mb-2">English Summary</h2>
        <p className="mb-4">{summaryEn}</p>
        <h2 className="text-xl font-bold mb-2">Urdu Summary</h2>
        <p className="mb-4" dir="rtl">{summaryUrdu}</p>
        <p className="text-green-500">{saveStatus}</p>
      </CardContent>
    </Card>
  );
}