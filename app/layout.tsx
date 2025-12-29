import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import PodcastSchema from "./components/PodcastSchema";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ECG PrintCast - O podcast queridinho da indústria gráfica!",
  description: "O podcast queridinho da indústria gráfica! Conectando profissionais, compartilhando conhecimento e fomentando networking valioso no setor gráfico. Novos episódios toda quinta-feira às 19h.",
  keywords: [
    "podcast",
    "indústria gráfica",
    "impressão",
    "gráfica",
    "offset",
    "flexografia",
    "networking",
    "ECG PrintCast",
    "TV Abigraf",
    "tecnologia gráfica",
    "embalagens",
    "tintas",
  ],
  authors: [{ name: "ECG PrintCast" }, { name: "TV Abigraf" }],
  metadataBase: new URL("https://ecgprintcast.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ECG PrintCast - O podcast queridinho da indústria gráfica!",
    description:
      "O podcast queridinho da indústria gráfica! Conectando profissionais, compartilhando conhecimento e fomentando networking valioso no setor gráfico. Novos episódios toda quinta-feira às 19h.",
    url: "https://ecgprintcast.com.br",
    siteName: "ECG PrintCast",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ECG PrintCast - O podcast queridinho da indústria gráfica",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECG PrintCast - O podcast queridinho da indústria gráfica!",
    description:
      "O podcast queridinho da indústria gráfica! Novos episódios toda quinta-feira às 19h.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicione seus códigos quando tiver:
    // google: "seu-codigo-google-search-console",
    // yandex: "seu-codigo-yandex",
    // bing: "seu-codigo-bing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <PodcastSchema />
      </head>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
