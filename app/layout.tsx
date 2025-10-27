import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js ＋ Splide を使ったアクセシブルなカルーセル プロトタイプ",
  description:
    "Next.js ＋ Splide を使ったアクセシブルなカルーセル プロトタイプ",
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
