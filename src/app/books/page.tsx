import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import BooksClient from "./books-client";

type BookEntry = { title: string; author: string; genre: string };
type ThemeGroup = { theme: string; books: readonly BookEntry[] };

const bookGroups = DATA.books as unknown as readonly ThemeGroup[];
const allBooks = bookGroups.flatMap((g) => g.books);

const description = `A personal collection of ${allBooks.length}+ readings and ideas that shape my worldview — notes on fiction, philosophy, and personal growth.`;

export const metadata: Metadata = {
  title: "Commonplace Book",
  description,
  alternates: {
    canonical: `${DATA.url}/books`,
  },
  openGraph: {
    title: `Commonplace Book | ${DATA.name}`,
    description,
    url: `${DATA.url}/books`,
    siteName: DATA.name,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Commonplace Book`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Commonplace Book | ${DATA.name}`,
    description,
    images: ["/og.png"],
  },
};

export default function BooksPage() {
  return <BooksClient />;
}
