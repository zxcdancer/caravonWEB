import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Admin — CARAVON.NL' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const adminToken = process.env.ADMIN_TOKEN || 'caravon-admin-secret';

  if (token !== adminToken) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
