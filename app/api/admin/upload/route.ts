import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { addGalleryItem } from '@/lib/gallery-data';

function isAuthenticated(token: string | undefined): boolean {
  const adminToken = process.env.ADMIN_TOKEN || 'caravon-admin-secret';
  return token === adminToken;
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const category = (formData.get('category') as string) || 'voor';

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (!allowed.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `photo-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const dest = path.join(process.cwd(), 'public', 'images', 'gallery', filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(dest, buffer);

  await addGalleryItem({
    filename,
    category: category as 'voor' | 'na',
    uploadedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, filename });
}
