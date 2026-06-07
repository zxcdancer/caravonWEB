'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type GalleryItem = {
  url: string;
  filename: string;
  category: 'voor' | 'na';
  uploadedAt: string;
};

type UploadFile = {
  file: File;
  preview: string;
  category: 'voor' | 'na';
  status: 'pending' | 'uploading' | 'done' | 'error';
};

export default function AdminPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState<'all' | 'voor' | 'na'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loadPhotos = useCallback(async () => {
    const res = await fetch('/api/admin/photos');
    if (res.ok) setPhotos(await res.json());
    else if (res.status === 401) router.push('/admin/login');
  }, [router]);

  useEffect(() => { loadPhotos(); }, [loadPhotos]);

  function addFiles(files: FileList | File[]) {
    const newUploads: UploadFile[] = Array.from(files)
      .filter(f => f.type.startsWith('image/') || f.name.match(/\.(jpg|jpeg|png|webp|heic)$/i))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
        category: 'voor' as const,
        status: 'pending' as const,
      }));
    setUploads(prev => [...prev, ...newUploads]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  async function uploadAll() {
    const pending = uploads.filter(u => u.status === 'pending');
    for (let i = 0; i < pending.length; i++) {
      const u = pending[i];
      setUploads(prev => prev.map(x => x.preview === u.preview ? { ...x, status: 'uploading' } : x));

      const fd = new FormData();
      fd.append('file', u.file);
      fd.append('category', u.category);

      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const status = res.ok ? 'done' : 'error';
      setUploads(prev => prev.map(x => x.preview === u.preview ? { ...x, status } : x));
    }
    await loadPhotos();
    setTimeout(() => setUploads(prev => prev.filter(u => u.status !== 'done')), 1500);
  }

  async function deletePhoto(photo: GalleryItem) {
    setDeleting(photo.url);
    await fetch('/api/admin/photos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: photo.url }),
    });
    setDeleting(null);
    await loadPhotos();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);
  const pendingCount = uploads.filter(u => u.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-[#1A1A1A] text-lg">CARAVON.NL</span>
            <span className="text-xs bg-[#E8640A] text-white px-2 py-0.5 rounded-full font-bold">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/nl" target="_blank" className="text-sm text-gray-500 hover:text-[#E8640A] transition">
              Bekijk site →
            </a>
            <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition">
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg text-[#1A1A1A] mb-4">Foto toevoegen</h2>

          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              dragging ? 'border-[#E8640A] bg-[#E8640A]/5' : 'border-gray-200 hover:border-[#E8640A] hover:bg-gray-50'
            }`}
          >
            <div className="text-4xl mb-2">📷</div>
            <p className="font-semibold text-gray-700">Sleep foto&apos;s hierheen</p>
            <p className="text-sm text-gray-400 mt-1">of klik om te selecteren · JPG, PNG, WEBP, HEIC</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic"
            multiple
            className="hidden"
            onChange={e => e.target.files && addFiles(e.target.files)}
          />

          {uploads.length > 0 && (
            <div className="mt-4 space-y-3">
              {uploads.map((u, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <img src={u.preview} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{u.file.name}</p>
                    <select
                      value={u.category}
                      onChange={e => setUploads(prev => prev.map((x, j) => j === i ? { ...x, category: e.target.value as 'voor' | 'na' } : x))}
                      disabled={u.status !== 'pending'}
                      className="mt-1 text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
                    >
                      <option value="voor">Voor (voor de reparatie)</option>
                      <option value="na">Na (na de reparatie)</option>
                    </select>
                  </div>
                  <div className="flex-shrink-0 text-sm">
                    {u.status === 'pending' && (
                      <button onClick={e => { e.stopPropagation(); setUploads(prev => prev.filter((_, j) => j !== i)); }} className="text-gray-400 hover:text-red-500">✕</button>
                    )}
                    {u.status === 'uploading' && <span className="text-[#E8640A]">Uploaden...</span>}
                    {u.status === 'done' && <span className="text-green-600">✓ Klaar</span>}
                    {u.status === 'error' && <span className="text-red-500">Fout</span>}
                  </div>
                </div>
              ))}
              {pendingCount > 0 && (
                <button onClick={uploadAll} className="w-full bg-[#E8640A] text-white font-bold py-3 rounded-xl hover:bg-[#c9530a] transition">
                  {pendingCount === 1 ? '1 foto uploaden' : `${pendingCount} foto's uploaden`}
                </button>
              )}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-bold text-lg text-[#1A1A1A]">Galerij ({photos.length} foto&apos;s)</h2>
            <div className="flex gap-2">
              {(['all', 'voor', 'na'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium transition ${
                    filter === f ? 'bg-[#E8640A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'Alle' : f === 'voor' ? 'Voor' : 'Na'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-2">🖼️</div>
              <p>{photos.length === 0 ? "Nog geen foto's" : 'Geen foto\'s in deze categorie'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(photo => (
                <div key={photo.url} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img src={photo.url} alt="" className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                    photo.category === 'voor' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {photo.category === 'voor' ? 'Voor' : 'Na'}
                  </div>
                  <button
                    onClick={() => deletePhoto(photo)}
                    disabled={deleting === photo.url}
                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                  >
                    {deleting === photo.url ? '…' : '✕'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
