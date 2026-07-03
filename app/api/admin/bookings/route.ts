import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBookings, deleteBooking } from '@/lib/db';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  return token === (process.env.ADMIN_TOKEN || 'caravon-admin-secret');
}

export async function GET() {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getBookings());
}

export async function DELETE(req: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  deleteBooking(Number(id));
  return NextResponse.json({ success: true });
}
