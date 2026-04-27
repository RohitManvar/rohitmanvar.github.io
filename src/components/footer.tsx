"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 mt-section-lg pb-24">
      <div className="max-w-2xl mx-auto px-container-padding py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear} {DATA.name}.</span>
            <span className="hidden sm:inline">Built with</span>
            <Heart className="size-3 text-red-500 fill-red-500 hidden sm:inline" />
            <span className="hidden sm:inline">using Next.js</span>
          </div>
          
          <div className="flex items-center gap-4">
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <Link
                  key={name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                  aria-label={name}
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
