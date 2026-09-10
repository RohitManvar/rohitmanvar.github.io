import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);

  if (!study) return {};

  return {
    title: `${study.title} Case Study`,
    description: study.summary,
    alternates: { canonical: `${DATA.url}/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} Case Study | ${DATA.name}`,
      description: study.summary,
      url: `${DATA.url}/projects/${study.slug}`,
      images: [{ url: study.image, alt: study.title }],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);

  if (!study) notFound();

  return (
    <main className="min-h-[100dvh] py-section-md pb-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <article className="mt-12 space-y-14">
        <header className="space-y-5">
          <p className="text-sm font-medium text-brand">{study.category}</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{study.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{study.summary}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {study.liveUrl && (
              <Link
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Visit project
                <ArrowUpRight className="size-4" />
              </Link>
            )}
            <Link
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Github className="size-4" />
              View source
            </Link>
          </div>
        </header>

        <div className="overflow-hidden rounded-xl border border-border/60 bg-muted">
          <Image
            src={study.image}
            alt={`${study.title} interface`}
            width={1200}
            height={700}
            className="h-auto w-full object-cover object-top"
            priority
          />
        </div>

        <dl className="grid grid-cols-1 gap-6 border-y border-border/60 py-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Role</dt>
            <dd className="mt-1 text-sm font-medium">{study.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Timeline</dt>
            <dd className="mt-1 text-sm font-medium">{study.timeline}</dd>
          </div>
        </dl>

        <CaseStudySection title="Overview">{study.overview}</CaseStudySection>
        <CaseStudySection title="The challenge">{study.challenge}</CaseStudySection>
        <CaseStudySection title="The approach">{study.solution}</CaseStudySection>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Architecture</h2>
          <div className="divide-y divide-border/60 border-y border-border/60">
            {study.architecture.map((item) => (
              <div key={item.name} className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-8">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 sm:grid-cols-2">
          <CaseStudyList title="Outcomes" items={study.outcomes} />
          <CaseStudyList title="What I learned" items={study.learnings} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((technology) => (
              <Badge key={technology} variant="secondary" className="font-normal">
                {technology}
              </Badge>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function CaseStudySection({ title, children }: { title: string; children: string }) {
  return (
    <section className="max-w-3xl space-y-3">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-base leading-8 text-muted-foreground">{children}</p>
    </section>
  );
}

function CaseStudyList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
