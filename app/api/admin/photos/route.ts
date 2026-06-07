import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { readGallery, removeGalleryItem } from '@/lib/gallery-data';

function isAuthenticated(token: string | undefined): boolean {
  const adminToken = process.env.ADMIN_TOKEN || 'caravon-admin-secret';
  return token === adminToken;
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await readGallery();
  return NextResponse.json(items);
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = await req.json();
  if (!filename || filename.includes('..') || filename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'images', 'gallery', filename);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may already be gone
  }

  await removeGalleryItem(filename);
  return NextResponse.json({ ok: true });
}
