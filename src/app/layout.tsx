import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import ResponsiveNav from '@/components/layout/responsive-nav';
import { AuthProvider } from '@/hooks/use-auth';


export const metadata: Metadata = {
  title: '7Plates',
  description: 'Track your macros and get personalized meal plans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.4.2/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.4.2/uicons-solid-rounded/css/uicons-solid-rounded.css'></link>
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            <div className="relative md:flex w-full min-h-screen">
                <ResponsiveNav />
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
