"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, X } from "lucide-react";
import { DATA } from "@/data/resume";
import { motion, AnimatePresence } from "framer-motion";

const BlurFade = dynamic(() => import("@/components/magicui/blur-fade").then(mod => mod.default), { ssr: false });
const BlurFadeText = dynamic(() => import("@/components/magicui/blur-fade-text").then(mod => mod.default), { ssr: false });

const BLUR_FADE_DELAY = 0.04;

type BookEntry = {
  title: string;
  author: string;
  number: number;
  cover: string;
  genre: string;
  view?: string;
};

type ThemeGroup = {
  theme: string;
  books: readonly BookEntry[];
};

const bookGroups = DATA.books as unknown as readonly ThemeGroup[];
const allBooks = bookGroups.flatMap((g) => g.books as unknown as BookEntry[]);

export default function BooksPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedBook]);
  
  const categories = ["All", ...Array.from(new Set(allBooks.map((book) => book.genre).filter(Boolean)))];

  const filteredBooks = allBooks.filter((book) => {
    const matchesFilter = filter === "All" || book.genre === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate top genre
  const topGenre = useMemo(() => {
    if (allBooks.length === 0) return "None";
    const counts = allBooks.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }, []);

  return (
    <main className="flex flex-col min-h-[100dvh] py-section-md space-y-12 relative">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </BlurFade>

      <section id="hero">
        <div className="w-full space-y-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            yOffset={8}
            text="Commonplace Book."
          />
          <BlurFadeText
            className="max-w-[600px] text-muted-foreground md:text-xl"
            delay={BLUR_FADE_DELAY * 3}
            text="A personal collection of readings and ideas that shape my worldview."
          />
          
          {/* Stats Row */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
                Total Books: <strong className="text-foreground">{allBooks.length}</strong>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
                Top Genre: <strong className="text-foreground">{topGenre}</strong>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Controls: Search and Filters */}
      <section id="controls" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            />
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Library Grid */}
      <section id="library">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filteredBooks.map((book, id) => (
              <BlurFade key={book.title + book.author} delay={BLUR_FADE_DELAY * 7 + id * 0.05}>
                <div 
                  className="group flex flex-col gap-3 h-full cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md border shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <BookOpen className="size-8 text-muted-foreground/50" />
                      </div>
                    )}
                    {/* Hover Overlay Hint for Desktop */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm hidden sm:flex">
                      <p className="text-white text-sm font-medium">Read Note →</p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2 leading-tight">{book.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{book.author}</p>
                    <div className="mt-auto pt-2">
                      <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No books found matching your search.
          </div>
        )}
      </section>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <>
            {/* Backdrop with negative inset to fix edge blurring artifact */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-[-50px] z-50 bg-background/80 backdrop-blur-md"
              onClick={() => setSelectedBook(null)}
            />
            
            {/* Modal Content Container */}
            <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-xl max-h-[90vh] bg-card rounded-2xl shadow-2xl border overflow-y-auto flex flex-col sm:flex-row pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 z-10 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors sm:text-muted-foreground sm:bg-transparent sm:hover:bg-muted"
                >
                  <X className="size-5" />
                </button>
                
                <div className="w-full sm:w-2/5 aspect-[2/3] sm:aspect-auto sm:min-h-full relative shrink-0">
                  {selectedBook.cover ? (
                    <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <BookOpen className="size-12 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 sm:p-8 flex flex-col w-full justify-center">
                  <span className="inline-block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                    {selectedBook.genre}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight mb-1">{selectedBook.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{selectedBook.author}</p>
                  
                  {selectedBook.view ? (
                    <div className="prose prose-sm dark:prose-invert">
                      <p className="italic text-muted-foreground leading-relaxed">
                        &ldquo;{selectedBook.view}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground/60 italic">No notes added yet.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
