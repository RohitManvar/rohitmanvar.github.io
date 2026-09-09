"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, Cloud, Layers } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

interface FeaturedSystemsProps {
  delay?: number;
}

type System = {
  title: string;
  href: string;
  description: string;
  contributions: string[];
  tech: string[];
};

// Cards use the site's own theme tokens — no decorative hues. Each keeps
// its icon keyed by original index so it stays consistent while cycling.
const CARD_ICONS = [Layers, Cloud, Layers];

// A circular carousel. Cards travel upward through the loop:
// below-back → front → above-back → wraps back to below.
// Indices match `order`, which advances by one each tick.
const STACK_POSITIONS = [
  { y: 0, scale: 1, opacity: 1 }, // front, centred
  { y: -104, scale: 0.9, opacity: 0.9 }, // just left the front, now above
  { y: 104, scale: 0.9, opacity: 0.9 }, // waiting below, rises next
];

const CARD_HEIGHT = 210;
// The furthest a card sits from centre in either direction — the container
// needs that much room above and below the front card so neither peeking
// card is clipped.
const MAX_STACK_OFFSET = Math.max(...STACK_POSITIONS.map((p) => Math.abs(p.y)));
const ROTATE_MS = 4000;

export function FeaturedSystems({ delay = 0 }: FeaturedSystemsProps) {
  const systems = DATA.productionSystems as unknown as System[];

  // order[0] is the title currently on top of the stack, order[1..] behind it.
  const [order, setOrder] = useState<string[]>(systems.map((s) => s.title));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      // Rotate backwards so the card waiting below (last in `order`) becomes
      // the front, and the front moves up behind — cards travel upward.
      setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const bringToFront = (title: string) => {
    setOrder((prev) => [title, ...prev.filter((t) => t !== title)]);
  };

  return (
    <div className="space-y-content-md">
      <BlurFade delay={delay}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Production Systems.
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Live systems built and maintained for manufacturing clients at Faber Infinite.
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={delay + 0.05}>
        <div
          className="relative mx-auto max-w-xl"
          style={{ height: CARD_HEIGHT + MAX_STACK_OFFSET * 2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {order.map((title, stackIndex) => {
              const system = systems.find((s) => s.title === title)!;
              const iconIndex = systems.findIndex((s) => s.title === title);
              const Icon = CARD_ICONS[iconIndex % CARD_ICONS.length];
              const pos = STACK_POSITIONS[stackIndex] ?? STACK_POSITIONS[STACK_POSITIONS.length - 1];
              const isFront = stackIndex === 0;

              return (
                <motion.div
                  key={title}
                  onClick={() => (isFront ? undefined : bringToFront(title))}
                  initial={{ y: pos.y, scale: pos.scale, opacity: 0 }}
                  animate={{ y: pos.y, scale: pos.scale, opacity: pos.opacity, zIndex: systems.length - stackIndex }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className={cn(
                    "absolute inset-x-0 top-1/2 rounded-[26px] overflow-hidden flex",
                    "border border-border/60 transition-colors",
                    // The front card sits on the normal card surface; the ones
                    // behind drop to a flatter grey so the stack reads as depth.
                    isFront
                      ? "bg-card text-card-foreground shadow-xl cursor-default"
                      : "bg-muted text-muted-foreground shadow-md cursor-pointer"
                  )}
                  // marginTop centres the card on the container's midline so
                  // the animated y offsets read symmetrically above and below,
                  // leaving the transform free for framer-motion.
                  style={{ height: CARD_HEIGHT, marginTop: -CARD_HEIGHT / 2 }}
                >
                  {/* Text side */}
                  <div className="flex-1 min-w-0 p-6 sm:p-7 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                        {system.title}
                      </h3>
                      {isFront && (
                        <Link
                          href={system.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-brand transition-colors flex-shrink-0"
                          aria-label={`Visit ${system.title}`}
                        >
                          <ArrowUpRightIcon className="size-4" />
                        </Link>
                      )}
                    </div>
                    {isFront && (
                      <>
                        <p className="text-xs sm:text-sm leading-relaxed mt-2 text-muted-foreground line-clamp-3">
                          {system.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto pt-3">
                          {system.tech.map((t) => (
                            <Badge key={t} variant="secondary" className="px-1.5 py-0 text-[10px] font-normal">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Icon panel — the reference's organic blob cutout, filled
                      with a muted tone instead of a photo. */}
                  <div
                    className={cn(
                      "relative w-28 sm:w-40 flex-shrink-0 flex items-center justify-center",
                      // Keep the blob readable against whichever surface the
                      // card is using — muted on the front, a shade deeper on
                      // the grey background cards.
                      isFront ? "bg-muted" : "bg-foreground/10"
                    )}
                    style={{
                      clipPath:
                        "path('M52,0 C18,14 34,34 20,54 C6,74 38,88 24,108 C10,128 42,142 28,162 C14,182 34,196 56,210 L400,210 L400,0 Z')",
                    }}
                  >
                    {isFront && (
                      <Icon className="size-10 sm:size-12 text-muted-foreground/40" strokeWidth={1.5} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </BlurFade>

      <BlurFade delay={delay + 0.1}>
        <p className="text-center text-xs text-muted-foreground pt-2">
          Cards cycle automatically — hover to pause, tap one to bring it forward.
        </p>
      </BlurFade>
    </div>
  );
}
