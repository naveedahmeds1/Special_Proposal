import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Special Note",
  description: "A private interactive experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
  }
