import fs from 'fs/promises';
import path from 'path';

export type GalleryItem = {
  filename: string;
  category: 'voor' | 'na';
  uploadedAt: string;
};

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

export async function readGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as GalleryItem[];
  } catch {
    return [];
  }
}

export async function writeGallery(items: GalleryItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export async function addGalleryItem(item: GalleryItem): Promise<void> {
  const items = await readGallery();
  items.unshift(item);
  await writeGallery(items);
}

export async function removeGalleryItem(filename: string): Promise<void> {
  const items = await readGallery();
  const filtered = items.filter(i => i.filename !== filename);
  await writeGallery(filtered);
}
