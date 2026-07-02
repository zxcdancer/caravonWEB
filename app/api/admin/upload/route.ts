import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
  const filename = `photo-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const relDir = `/gallery/${category}`;
  const absDir = path.join(process.cwd(), 'public', 'gallery', category);
  const absPath = path.join(absDir, filename);

  try {
    await mkdir(absDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absPath, buffer);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = `${baseUrl}${relDir}/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Upload error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
