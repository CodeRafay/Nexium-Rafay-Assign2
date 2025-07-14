import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import URLInputForm from './components/URLInputForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Blog Summariser</CardTitle>
        </CardHeader>
        <CardContent>
          <URLInputForm />
        </CardContent>
      </Card>
    </div>
  );
}