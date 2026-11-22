import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${site.name}: hitung kebutuhan, baru beli`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name}: hitung kebutuhan, baru beli`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${dmSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#konten"
            className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
          >
            Lewati ke konten
          </a>
          <SiteHeader />
          <main id="konten" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
