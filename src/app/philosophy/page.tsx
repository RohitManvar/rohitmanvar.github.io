import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";

const BLUR_FADE_DELAY = 0.04;

const description =
  "The thinkers and ideas that changed how I see things — notes on Stoicism, Nietzsche, and Osho.";

export const metadata: Metadata = {
  title: "Philosophy",
  description,
  alternates: {
    canonical: `${DATA.url}/philosophy`,
  },
  openGraph: {
    title: `Philosophy | ${DATA.name}`,
    description,
    url: `${DATA.url}/philosophy`,
    siteName: DATA.name,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Philosophy`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Philosophy | ${DATA.name}`,
    description,
    images: ["/og.png"],
  },
};

type Philosopher = {
  name: string;
  era: string;
  work: string;
  coreIdea: string;
  perspective: string;
};

export default function PhilosophyPage() {
  const philosophers = DATA.philosophers as unknown as readonly Philosopher[];

  return (
    <main className="flex flex-col min-h-[100dvh] py-section-md space-y-12">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </BlurFade>

      <section id="hero">
        <div className="w-full space-y-4">
          <BlurFadeText
            as="h1"
            delay={BLUR_FADE_DELAY * 2}
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            yOffset={8}
            text="Philosophy."
          />
          <BlurFadeText
            className="max-w-[600px] text-muted-foreground md:text-xl"
            delay={BLUR_FADE_DELAY * 3}
            text="Thinkers and ideas that changed my perspective."
          />
        </div>
      </section>

      <section id="thinkers" className="space-y-8">
        {philosophers.map((p, id) => (
          <BlurFade key={p.name} delay={BLUR_FADE_DELAY * (4 + id)}>
            <article className="rounded-xl border border-border/60 bg-card p-6 sm:p-7 space-y-4">
              <header className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">{p.name}</h2>
                <p className="text-xs text-muted-foreground">{p.era}</p>
              </header>

              <blockquote className="border-l-2 border-brand pl-4 text-sm sm:text-base font-medium leading-relaxed">
                {p.coreIdea}
              </blockquote>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.perspective}
              </p>

              <footer className="pt-1">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Read:</span> {p.work}
                </p>
              </footer>
            </article>
          </BlurFade>
        ))}
      </section>
    </main>
  );
}
