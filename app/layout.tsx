import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import ThemeProvider from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cotask",
    template: "Cotask - %s",
  },
  description: "A collaborative task management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
