import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ITech Digitals – Envision. Execute. Elevate.",
  description:
    "ITech Digitals is a leading tech & design agency offering web development, branding, animations, photography, videography, social media management, and digital marketing services in Kuwait and Pakistan.",
  keywords:
    "ITech Digitals, digital agency Kuwait, web development, branding, social media, animations, videography, app development",
  icons: {
    icon: [
      { url: "/images/Logo_brand.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/Logo.png", type: "image/png" },
    ],
    shortcut: "/images/Logo_brand.png",
  },
  openGraph: {
    title: "ITech Digitals – Envision. Execute. Elevate.",
    description:
      "Pioneering design excellence and transforming your vision into captivating reality.",
    type: "website",
    locale: "en_US",
    siteName: "ITech Digitals",
    images: [{ url: "/images/Logo.png", width: 400, height: 300, alt: "ITech Digitals Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
