import { Alert, AlertDescription } from '@/components/ui/alert';
//import { Alert, AlertDescription } from '../../components/ui/alert';

export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <Alert variant="destructive">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}