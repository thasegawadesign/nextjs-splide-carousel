import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "Next.js ＋ Splide を使ったアクセシブルなカルーセル",
  description: "Next.js ＋ Splide を使ったアクセシブルなカルーセル",
  verification: {
    google: googleSiteVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body>
        {children}
        {isProduction && <Analytics />}
      </body>
      {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
