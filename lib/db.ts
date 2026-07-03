import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'bookings.db');

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naam TEXT NOT NULL,
    telefoon TEXT,
    email TEXT,
    voertuig TEXT,
    service TEXT,
    date TEXT,
    time TEXT,
    omschrijving TEXT,
    locale TEXT DEFAULT 'nl',
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
  )
`);

export type Booking = {
  id: number;
  naam: string;
  telefoon: string;
  email: string;
  voertuig: string;
  service: string;
  date: string;
  time: string;
  omschrijving: string;
  locale: string;
  created_at: string;
};

export function saveBooking(data: Omit<Booking, 'id' | 'created_at'>) {
  const stmt = db.prepare(`
    INSERT INTO bookings (naam, telefoon, email, voertuig, service, date, time, omschrijving, locale)
    VALUES (@naam, @telefoon, @email, @voertuig, @service, @date, @time, @omschrijving, @locale)
  `);
  return stmt.run(data);
}

export function getBookings(): Booking[] {
  return db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all() as Booking[];
}

export function deleteBooking(id: number) {
  return db.prepare('DELETE FROM bookings WHERE id = ?').run(id);
}

export default db;
