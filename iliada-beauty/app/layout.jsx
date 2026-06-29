import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://iliada-beauty.ch"),
  title: "Iliada Beauty — Premium Beauty Salon in Strengelbach",
  description:
    "Iliada Beauty — Ihr Premium Beauty Salon in Strengelbach. Nägel, Wimpern- & Brow-Lifting, Permanent Make-up, Aqua Peeling und Laser.",
  openGraph: {
    title: "Iliada Beauty — Premium Beauty Salon in Strengelbach",
    description: "Nägel, Wimpern- & Brow-Lifting, Permanent Make-up, Aqua Peeling und Laser.",
    images: ["/salon.jpg"],
    locale: "de_CH",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-CH">
      <body>{children}</body>
    </html>
  );
}
