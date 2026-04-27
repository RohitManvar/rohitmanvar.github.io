"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const GENRE_CONFIG: Record<string, { gradient: string; spine: string; badge: string }> = {
  "Self-Improvement": {
    gradient: "from-amber-400 via-orange-400 to-red-400",
    spine: "linear-gradient(to bottom, #f59e0b, #ef4444)",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  Productivity: {
    gradient: "from-sky-400 via-blue-400 to-cyan-500",
    spine: "linear-gradient(to bottom, #38bdf8, #06b6d4)",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  Motivation: {
    gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
    spine: "linear-gradient(to bottom, #c084fc, #ec4899)",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  },
  Biography: {
    gradient: "from-emerald-400 via-teal-400 to-green-500",
    spine: "linear-gradient(to bottom, #34d399, #10b981)",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Fiction: {
    gradient: "from-rose-400 via-red-400 to-pink-500",
    spine: "linear-gradient(to bottom, #fb7185, #ec4899)",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  },
  Novel: {
    gradient: "from-indigo-400 via-violet-400 to-purple-500",
    spine: "linear-gradient(to bottom, #818cf8, #a855f7)",
    badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
};

const DEFAULT_CONFIG = {
  gradient: "from-slate-400 via-gray-400 to-zinc-500",
  spine: "linear-gradient(to bottom, #94a3b8, #64748b)",
  badge: "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300",
};

const SPINE_W = 20; // px — book thickness

interface Props {
  title: string;
  author: string;
  number: number;
  cover: string;
  genre: string;
  view?: string;
}

export function BookPageCard({ title, author, number, cover, genre, view }: Props) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const config = GENRE_CONFIG[genre] ?? DEFAULT_CONFIG;
  const showCover = cover && !imgError;

  return (
    <div className="flex flex-col gap-3">
      {/* 3D book scene */}
      <div
        style={{ perspective: "900px", perspectiveOrigin: "60% 50%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "relative" }}
          animate={{ rotateY: hovered ? -32 : -12 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Front face ─────────────────────────────────── */}
          <div
            className="relative w-full overflow-hidden rounded-r-md shadow-md"
            style={{
              aspectRatio: "2 / 3",
              transform: `translateZ(${SPINE_W / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Cover image or gradient fallback */}
            {showCover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt={`${title} cover`}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center p-3 text-white`}
              >
                <BookOpen className="size-8 mb-2 opacity-70" />
                <p className="text-center text-xs font-semibold leading-snug line-clamp-4 opacity-90">
                  {title}
                </p>
              </div>
            )}

            {/* View overlay on hover */}
            {view && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-[11px] italic text-center leading-relaxed line-clamp-6">
                  &ldquo;{view}&rdquo;
                </p>
              </motion.div>
            )}

            {/* Number badge */}
            <span className="absolute top-2 left-2 z-10 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              #{number}
            </span>
          </div>

          {/* ── Spine (left face) ──────────────────────────── */}
          <div
            className="absolute top-0 left-0 rounded-l-md"
            style={{
              width: `${SPINE_W}px`,
              height: "100%",
              transform: `rotateY(-90deg) translateZ(${SPINE_W / 2}px)`,
              transformOrigin: "left center",
              background: config.spine,
              backfaceVisibility: "hidden",
            }}
          />

          {/* ── Pages edge (right face) ────────────────────── */}
          <div
            className="absolute top-0 right-0"
            style={{
              width: `${SPINE_W}px`,
              height: "100%",
              transform: `rotateY(90deg) translateZ(${SPINE_W / 2}px)`,
              transformOrigin: "right center",
              background:
                "repeating-linear-gradient(to bottom, #f5f0e8 0px, #f5f0e8 3px, #e8e0d0 3px, #e8e0d0 4px)",
              backfaceVisibility: "hidden",
            }}
          />

          {/* ── Back face ──────────────────────────────────── */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-70`}
            style={{
              transform: `rotateY(180deg) translateZ(${SPINE_W / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
      </div>

      {/* Book info below the 3D object */}
      <div className="px-1 space-y-1">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{author}</p>
        <span
          className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full ${config.badge}`}
        >
          {genre}
        </span>
      </div>
    </div>
  );
}
