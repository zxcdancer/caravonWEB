import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

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
        const { mtime } = await stat(path.join(dir, f));
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
  const [voor, na] = await Promise.all([listCategory('voor'), listCategory('na')]);
  const items = [...voor, ...na].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  return NextResponse.json(items);
}
