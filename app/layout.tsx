import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Notes — Next-level note taking",
    template: "%s | Notes",
  },
  description:
    "Friendly notes with rich editor, cloud sync, and...that's about it",
  keywords: ["notes", "editor", "productivity", "cloud"],
  authors: [{ name: "Arjun Sharma", url: `https://arjunsharmahehe.tech` }],
  creator: "Arjun Sharma",
  applicationName: "Notes",
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Notes — Next-level note taking",
    description:
      "Friendly notes with rich editor, cloud sync, and...that's about it",
    siteName: "Notes",
    images: [
      {
        url: "/notes.png", // can be relative when metadataBase is set
        width: 1200,
        height: 630,
        alt: "Notes app preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes — Next-level note taking",
    description:
      "Friendly notes with rich editor, cloud sync, and...that's about it",
    creator: "@arjunsharmahehe",
    images: ["/notes.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>

      </body>
    </html>
  );
}
