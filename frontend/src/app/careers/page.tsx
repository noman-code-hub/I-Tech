import type { Metadata } from "next";
import CareersPageClient from "@/components/CareersPageClient";

export const metadata: Metadata = {
  title: "Careers at i-TECH Digitals",
  description:
    "Explore open roles at i-TECH Digitals and apply for careers in development, design, marketing, and sales.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
