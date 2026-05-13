"use client";

import { PageTransition } from "@/components/page-transition";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
