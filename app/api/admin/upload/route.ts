import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';

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

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `gallery/${category}/photo-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const blob = await put(filename, file, {
    access: 'public',
    contentType: file.type || 'image/jpeg',
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
