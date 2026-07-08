import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.inor.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "INOR Security | Close Protection Services",
  description:
    "INOR Security. Discreet close protection, executive security, event security and risk assessment. Security without compromise.",
  applicationName: "INOR Security",
  keywords: [
    "close protection",
    "executive security",
    "event security",
    "risk assessment",
    "secure transport",
    "INOR Security",
  ],
  authors: [{ name: "INOR Security" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "INOR Security | Close Protection Services",
    description:
      "Discreet close protection, executive security, event security and risk assessment. Security without compromise.",
    siteName: "INOR Security",
    images: [
      {
        url: "/assets/META DATA IMAGE.png",
        width: 2000,
        height: 2000,
        alt: "INOR Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INOR Security | Close Protection Services",
    description:
      "Discreet close protection, executive security, event security and risk assessment.",
    images: ["/assets/META DATA IMAGE.png"],
  },
  icons: {
    icon: "/assets/FAVICON.png",
    shortcut: "/assets/FAVICON.png",
    apple: "/assets/FAVICON.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        {children}
      </body>
    </html>
  );
}
