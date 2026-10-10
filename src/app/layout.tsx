import type { Metadata } from "next";
import { Hanken_Grotesk, Unbounded } from "next/font/google";

import { profile } from "@/content/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/sections/Header";

import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: "variable",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.brand} | Web development and AI automation by ${profile.name}`,
  description:
    "Web development and AI automation from Lapu-Lapu City, Cebu. 7+ years building and rolling out software, most recently for life-sciences teams in 35+ countries.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${unbounded.variable} ${hanken.variable} antialiased`}>
      <body className="tin-bg min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
