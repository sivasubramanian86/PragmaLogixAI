import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PragmaLogixAI - Life Decision Intelligence OS",
  description: "A personal/household decision operating system that reduces everyday friction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="sr-only focus-visible:not-sr-only">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
