import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Famous B Restaurant - Authentic Cuisine in Leeds",
  description: "Visit Famous B Restaurant in Leeds for delicious authentic cuisine. Located at 1st & 2nd floor 34 Regent St, Leeds LS2 7QN. Collection only. Call us at +44 7438 036883.",
  keywords: ["Famous B Restaurant", "Leeds restaurant", "authentic cuisine", "food collection", "Leeds LS2 7QN", "Regent Street Leeds", "restaurant near me", "takeaway Leeds"],
  icons: {
    icon: "/FamousB_Restaurant_Leeds_logo.png",
  },
  openGraph: {
    title: "Famous B Restaurant - Authentic Cuisine in Leeds",
    description: "Visit Famous B Restaurant in Leeds for delicious authentic cuisine. Collection only.",
    type: "website",
    url: "https://www.famousbrestaurant.co.uk",
    images: [
      {
        url: "https://www.famousbrestaurant.co.uk/reataurant.webp",
        width: 1200,
        height: 630,
        alt: "Famous B Restaurant Leeds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Famous B Restaurant - Authentic Cuisine in Leeds",
    description: "Visit Famous B Restaurant in Leeds for delicious authentic cuisine. Collection only.",
    images: ["https://www.famousbrestaurant.co.uk/reataurant.webp"],
  },
  robots: "index, follow, max-image-preview:large",
  alternates: {
    canonical: "https://www.famousbrestaurant.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.just-eat.co.uk" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Famous B Restaurant",
              "image": "https://www.famousbrestaurant.co.uk/reataurant.webp",
              "url": "https://www.famousbrestaurant.co.uk",
              "telephone": "+447438036883",
              "email": "FAMOUSEDENENE@ROCKETMAIL.COM",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1st & 2nd floor 34 Regent St",
                "addressLocality": "Leeds",
                "postalCode": "LS2 7QN",
                "addressCountry": "GB"
              },
              "servesCuisine": ["Nigerian", "West African"],
              "priceRange": "££",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
                  "opens": "12:00",
                  "closes": "00:30"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Friday","Saturday","Sunday"],
                  "opens": "12:00",
                  "closes": "01:00"
                }
              ],
              "hasMap": "https://www.google.com/maps/search/?api=1&query=34+Regent+St+Leeds+LS2+7QN",
              "menu": "https://www.famousbrestaurant.co.uk/#menu",
              "orderUrl": "https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu"
            }),
          }}
        />
      </body>
    </html>
  );
}
