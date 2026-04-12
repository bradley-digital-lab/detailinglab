"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Hide the footer on the executive summary page and its sub-paths
  if (pathname === "/executive-summary" || pathname?.startsWith("/executive-summary/")) {
    return null;
  }

  return <Footer />;
}
