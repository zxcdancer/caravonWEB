import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { list, del } from '@vercel/blob';

function isAuthenticated(token: string | undefined): boolean {
  const adminToken = process.env.ADMIN_TOKEN || 'caravon-admin-secret';
  return token === adminToken;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'No url' }, { status: 400 });

  await del(url);
  return NextResponse.json({ ok: true });
}
