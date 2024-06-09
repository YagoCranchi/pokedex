import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A project of pokedex in Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SkeletonTheme baseColor="#e5e5e5" highlightColor="#dbdada">
            <NavBar />
            {children}
          </SkeletonTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
