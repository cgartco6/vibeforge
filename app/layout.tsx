import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "VibeForge - Better Than Base44",
  description: "Build apps and games with natural language",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
