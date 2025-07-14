import { createClient } from '@supabase/supabase-js';
import clientPromise from '../../../lib/mongo';

export async function POST(request) {
  try {
    const { blog_url, summary_en, summary_urdu, full_text } = await request.json();

    if (!blog_url || !summary_en || !summary_urdu || !full_text) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    // Save summaries to Supabase
    const { error: supabaseError } = await supabase
      .from('summaries')
      .insert([{ blog_url, summary_en, summary_urdu }]);

    if (supabaseError) {
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Save full blog text to MongoDB
    const client = await clientPromise;
    const db = client.db('blogdata');
    const collection = db.collection('fullblogs');

    await collection.insertOne({
      blog_url,
      full_text,
      created_at: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Data saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}