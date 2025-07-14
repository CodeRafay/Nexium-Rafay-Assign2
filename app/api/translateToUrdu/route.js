import { NextResponse } from 'next/server';

const dictionary = {
  blog: 'بلاگ',
  summary: 'خلاصہ',
  content: 'مواد',
  article: 'مضمون',
  information: 'معلومات',
  read: 'پڑھنا',
  write: 'لکھنا',
  important: 'اہم',
  topic: 'موضوع',
  learn: 'سیکھنا'
};

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const translated = text
      .split(' ')
      .map(word => dictionary[word.toLowerCase()] || word)
      .join(' ');

    return NextResponse.json({ translated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to translate text' }, { status: 500 });
  }
}