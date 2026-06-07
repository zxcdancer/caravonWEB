import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  const { blobs } = await list({ prefix: 'gallery/' });

  const items = blobs
    .filter(b => b.pathname.match(/\.(jpg|jpeg|png|webp|heic)$/i))
    .map(b => ({
      url: b.url,
      filename: b.pathname,
      category: b.pathname.startsWith('gallery/na/') ? 'na' : 'voor',
      uploadedAt: b.uploadedAt,
    }))
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return NextResponse.json(items);
}
