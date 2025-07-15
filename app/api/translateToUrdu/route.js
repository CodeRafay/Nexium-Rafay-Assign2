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
  learn: 'سیکھنا',
  description: 'تفصیل',
  author: 'مصنف',
  published: 'شائع شدہ',
  update: 'تازہ کاری',
  review: 'جائزہ',
  tips: 'مشورے',
  guide: 'رہنما',
  tutorial: 'سبق',
  experience: 'تجربہ',
  idea: 'خیال',
  explore: 'دریافت کرنا',
  discover: 'کھوجنا',
  latest: 'تازہ ترین',
  popular: 'مقبول',
  useful: 'مفید',
  feature: 'خصوصیت',
  introduction: 'تعارف',
  conclusion: 'نتیجہ',
  opinion: 'رائے',
  feedback: 'رائے',
  improve: 'بہتر بنانا',
  analysis: 'تجزیہ',
  resource: 'وسیلہ',
  perspective: 'نقطہ نظر',
  highlight: 'اہم بات',
  example: 'مثال',
  benefit: 'فائدہ',
  advantage: 'برتری',
  disadvantage: 'نقصان',
  problem: 'مسئلہ',
  solution: 'حل',
  question: 'سوال',
  answer: 'جواب',
  comment: 'تبصرہ',
  share: 'بانٹنا',
  readMore: 'مزید پڑھیں'
  // Add more words as needed
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