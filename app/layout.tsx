import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js ＋ Splide を使ったアクセシブルなカルーセル実装",
  description: "Next.js ＋ Splide を使ったアクセシブルなカルーセル実装",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
