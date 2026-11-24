import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Background } from "@/components/Background";
import { Preloader } from "@/components/Preloader";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site, musicTracks } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const basePath = process.env.PAGES_BASE_PATH ?? "";
  const tracks = musicTracks.map((track) => ({
    ...track,
    src: `${basePath}${track.src}`,
  }));

  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <Preloader />
        <Background />
        <SiteHeader />
        <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 pt-24 pb-16 sm:px-8 sm:pt-32">
          {children}
        </main>
        <SiteFooter />
        <MusicPlayer tracks={tracks} />
      </body>
    </html>
  );
}
