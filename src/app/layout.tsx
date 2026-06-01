import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Famous B Restaurant - Authentic Cuisine in Leeds",
  description: "Visit Famous B Restaurant in Leeds for delicious authentic cuisine. Located at 1st & 2nd floor 34 Regent St, Leeds LS2 7QN. Collection only. Call us at +44 7438 036883.",
  keywords: ["Famous B Restaurant", "Leeds restaurant", "authentic cuisine", "food collection", "Leeds LS2 7QN", "Regent Street Leeds", "restaurant near me", "takeaway Leeds"],
  openGraph: {
    title: "Famous B Restaurant - Authentic Cuisine in Leeds",
    description: "Visit Famous B Restaurant in Leeds for delicious authentic cuisine. Collection only.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
