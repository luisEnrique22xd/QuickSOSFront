import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QuickSOS',
  description: 'Alerta inmediata, respuesta segura.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-512x512.png',
  },
  themeColor: '#ff0000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}