import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kronos Habitat",
  description: "Transforme seus hábitos em uma jornada épica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
