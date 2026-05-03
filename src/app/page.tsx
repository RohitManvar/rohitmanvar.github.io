"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";

const GitHubContributions = dynamic(() => import("@/components/github-contributions").then(mod => mod.GitHubContributions), { ssr: false });
const TechStack = dynamic(() => import("@/components/tech-stack").then(mod => mod.TechStack), { ssr: false });
const TimelineItem = dynamic(() => import("@/components/resume-card").then(mod => mod.TimelineItem), { ssr: false });
const ContactOrbiting = dynamic(() => import("@/components/contact-orbiting").then(mod => mod.ContactOrbiting), { ssr: false });
const ContactForm = dynamic(() => import("@/components/contact-form").then(mod => mod.ContactForm), { ssr: false });
const Globe3D = dynamic(() => import("@/components/globe-3d").then(mod => mod.Globe3D), { ssr: false });


const BlurFade = dynamic(() => import("@/components/magicui/blur-fade").then(mod => mod.default), { ssr: false });
const BlurFadeText = dynamic(() => import("@/components/magicui/blur-fade-text").then(mod => mod.default), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/project-card").then(mod => mod.ProjectCard), { ssr: false });
const TableOfContents = dynamic(() => import("@/components/table-of-contents").then(mod => mod.TableOfContents), { ssr: false });
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(DATA.projects.map((project) => project.category).filter(Boolean)))];

  const filteredProjects = DATA.projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <main className="flex flex-col min-h-[100dvh] py-section-md">
      <TableOfContents />

      <section id="hero" className="mb-section-lg">
        <div className="w-full space-y-content-lg">
          <div className="gap-2 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 1.2}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}.`}
              />

              <BlurFadeText
                className="max-w-[600px] text-muted-foreground md:text-xl"
                delay={BLUR_FADE_DELAY * 2}
                text={DATA.description}
              />
              
              <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
                <div className="pt-4 flex">
                  <div className="inline-flex items-center text-sm font-medium text-muted-foreground font-mono">
                    {"> Available for Opportunities".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (BLUR_FADE_DELAY * 2.5) + index * 0.04, duration: 0.1 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="ml-1 w-2 h-4 bg-muted-foreground inline-block"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
                <div className="pt-4 flex gap-3 flex-wrap">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2">
                    <DownloadIcon className="size-4" />
                    Download Resume
                  </a>
                </div>
              </BlurFade> */}
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="relative">
                <Avatar className="relative size-36 border-2 border-background shadow-xl">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about" className="mb-section-lg">
        <div className="space-y-content-md">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <div className="space-y-content-sm">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                I was born and raised in Junagadh. I&apos;ve always been curious about how things work, and early on, I loved exploring the mysteries of life and developing a sense of spiritual awareness.<br />
                <span className="bg-yellow-100 dark:bg-blue-900 dark:text-amber-100 px-1 rounded">
                  "I'm exerting myself to escape the same mind that traps me."
                </span>
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                Back when I worked as an HR Assistant, I often faced issues with salary processing, ERP software, and attendance systems. One day, I watched how a professionals solved those problems with technology, and it left a lasting impression—I realized I wanted to understand and build such solutions myself.
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                That moment pushed me to pursue a Bachelor’s in Computer Applications at Atmiya University, Rajkot, where I explored programming, theory, and built a strong technical foundation. Today, as a Master’s student at The Maharaja Sayajirao University of Baroda, I’m continuing that journey and growing as a developer.
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 15}>
              <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                Along the way, I found two passions: Android application development and Data Engineering. With Android, I enjoy creating apps that bring ideas to life for users. And with Data Engineering, I dive into the world of pipelines, scalable systems, and insights.
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <Globe3D />
            </BlurFade>
          </div>
        </div>
      </section>


      <section id="work" className="mb-section-lg">
        <div className="space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <h2 className="text-xl font-bold">Technical Experience</h2>
          </BlurFade>
          <div className="space-y-0">
            {DATA.technicalExperience.map((work, id) => (
              <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
                <TimelineItem
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  bullets={work.bullets}
                  isLast={id === DATA.technicalExperience.length - 1}
                  defaultExpanded={id === 0}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mb-section-lg">
        <div className="space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="space-y-0">
            {DATA.education.map((education, id) => (
              <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 20 + id * 0.05}>
                <TimelineItem
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  href={education.href}
                  period={`${education.start} - ${education.end}`}
                  isLast={id === DATA.education.length - 1}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="mb-section-lg">
        <TechStack delay={BLUR_FADE_DELAY * 21} />
      </section>

      <section id="projects" className="mb-section-lg">
        <div className="space-y-content-lg">
          <BlurFade delay={BLUR_FADE_DELAY * 22}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work.
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to android applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto mt-6">
            {filteredProjects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 23 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  color={project.color}
                  portrait={"portrait" in project ? (project.portrait as boolean) : false}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>



      <section id="github" className="mb-section-lg">
        <GitHubContributions username="RohitManvar" delay={BLUR_FADE_DELAY * 24} />
      </section>

      <section id="books" className="mb-section-lg">
        <BlurFade delay={BLUR_FADE_DELAY * 25}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Commonplace Book.
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A personal collection of readings and ideas that shape my worldview.
              </p>
            </div>
            <a
              href="/books"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 hover:text-foreground text-muted-foreground transition-colors"
            >
              View all {(DATA.books as unknown as { books: unknown[] }[]).reduce((acc, g) => acc + g.books.length, 0)} books →
            </a>
          </div>
        </BlurFade>
      </section>
      <ContactOrbiting delay={BLUR_FADE_DELAY * 33} />
      <section id="contact" className="mb-section-lg pb-20">
        <ContactForm delay={BLUR_FADE_DELAY * 34} />
      </section>
    </main>
  );
}
