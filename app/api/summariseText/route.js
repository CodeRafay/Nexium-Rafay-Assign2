import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const stopwords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const wordFreq = {};

    // Extract keywords
    text.toLowerCase().split(/\W+/).forEach(word => {
      if (!stopwords.includes(word) && word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    // Score sentences
    const sentenceScores = sentences.map(sentence => {
      let score = 0;
      sentence.toLowerCase().split(/\W+/).forEach(word => {
        if (wordFreq[word]) score += wordFreq[word];
      });
      return { sentence, score };
    });

    // Select top 5 sentences
    const summary = sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.sentence)
      .join('. ');

    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to summarize text' }, { status: 500 });
  }
}