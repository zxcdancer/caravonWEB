import { NextResponse } from 'next/server';
import { readGallery } from '@/lib/gallery-data';

export async function GET() {
  const items = await readGallery();
  return NextResponse.json(items);
}
