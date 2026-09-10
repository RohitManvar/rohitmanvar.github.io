import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectShowcaseRowProps {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  image?: string;
  color?: string;
  /** Phone/app screenshots are shown whole; web captures crop to their top. */
  portrait?: boolean;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  caseStudyHref?: string;
}

export function ProjectShowcaseRow({
  title,
  href,
  description,
  tags,
  image,
  color = "#0f172a",
  portrait = false,
  links,
  caseStudyHref,
}: ProjectShowcaseRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
      <div className="space-y-3 order-2 md:order-1">
        <h3 className="text-lg sm:text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-center gap-2 pt-2">
            {caseStudyHref && (
              <Link
                href={caseStudyHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
              >
                Case study
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge className="flex gap-1.5 px-2.5 py-1 text-xs">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="order-1 md:order-2 block rounded-xl overflow-hidden border border-border/60 shadow-md hover:shadow-xl transition-shadow duration-300"
        style={{ backgroundColor: portrait ? color : undefined }}
      >
        {image ? (
          <div className="relative w-full h-56 sm:h-64">
            <Image
              src={image}
              alt={title}
              fill
              // Web captures are very tall, so filling the frame from the top
              // shows the part that reads — letterboxing them whole leaves a
              // thin unreadable strip. Phone shots stay whole.
              className={portrait ? "object-contain" : "object-cover object-top"}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : (
          <div className="w-full h-56 sm:h-64 bg-muted" />
        )}
      </Link>
    </div>
  );
}
