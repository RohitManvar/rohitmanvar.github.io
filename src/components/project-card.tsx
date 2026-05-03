import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  iframe?: string;
  color?: string;
  portrait?: boolean;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  iframe,
  color = "#1e293b",
  portrait = false,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 ease-out h-full p-0",
        className
      )}
    >
      <Link
        href={href || "#"}
        className="block cursor-pointer"
      >
        {video && (
          <div className="h-48 w-full flex items-center justify-center p-4 overflow-hidden" style={{ backgroundColor: color }}>
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none w-full h-full object-cover object-top rounded-md shadow-lg"
            />
          </div>
        )}
        {!video && image && !portrait && (
          <div className="h-48 w-full flex items-center justify-center p-4 overflow-hidden" style={{ backgroundColor: color }}>
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="w-full h-full object-cover object-top rounded-md shadow-lg"
            />
          </div>
        )}
        {!video && image && portrait && (
          <div className="h-56 w-full flex items-center justify-center p-4 overflow-hidden" style={{ backgroundColor: color }}>
            <Image
              src={image}
              alt={title}
              width={180}
              height={320}
              className="h-full w-auto object-cover object-top rounded-xl shadow-2xl"
            />
          </div>
        )}
        {!video && !image && iframe && (
          <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: color }}>
            <div className="absolute inset-4 rounded-md shadow-lg overflow-hidden">
              <iframe
                src={iframe}
                title={`${title} preview`}
                scrolling="no"
                className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
                style={{
                  width: 1280,
                  height: 800,
                  transform: `scale(${500 / 1280})`,
                }}
              />
            </div>
          </div>
        )}
      </Link>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-content-md">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
