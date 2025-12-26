import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ECG PrintCast - O podcast queridinho da indústria gráfica!",
  description: "O podcast queridinho da indústria gráfica! Conectando profissionais, compartilhando conhecimento e fomentando networking valioso no setor gráfico.",
  keywords: ["podcast", "indústria gráfica", "impressão", "gráfica", "networking", "ECG PrintCast"],
  authors: [{ name: "ECG PrintCast" }],
  openGraph: {
    title: "ECG PrintCast - O podcast queridinho da indústria gráfica!",
    description: "O podcast queridinho da indústria gráfica!",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
