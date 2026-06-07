import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CARAVON.NL',
  description: 'Kwalitatieve reparaties voor campers & caravans',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
