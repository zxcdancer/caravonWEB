import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

function isAuthenticated(token: string | undefined): boolean {
  const adminToken = process.env.ADMIN_TOKEN || 'caravon-admin-secret';
  return token === adminToken;
}

const IMAGE_RE = /\.(jpg|jpeg|png|webp|heic)$/i;
const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

async function listCategory(category: string) {
  const dir = path.join(GALLERY_DIR, category);
  try {
    const files = await readdir(dir);
    const images = files.filter(f => IMAGE_RE.test(f));
    return await Promise.all(
      images.map(async (f) => {
        const filePath = path.join(dir, f);
        const { mtime } = await stat(filePath);
        return {
          url: `${BASE_URL}/gallery/${category}/${f}`,
          filename: `gallery/${category}/${f}`,
          category,
          uploadedAt: mtime.toISOString(),
        };
      })
    );
  } catch {
    return [];
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [voor, na] = await Promise.all([listCategory('voor'), listCategory('na')]);
  const items = [...voor, ...na].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return NextResponse.json(items);
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = await req.json();
  if (!filename) return NextResponse.json({ error: 'No filename' }, { status: 400 });

  // filename = "gallery/voor/photo-xxx.jpg" — strip leading slash just in case
  const rel = filename.replace(/^\//, '');
  const absPath = path.join(process.cwd(), 'public', rel);

  // Safety: must stay inside public/gallery/
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery');
  if (!absPath.startsWith(galleryRoot)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  try {
    await unlink(absPath);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
