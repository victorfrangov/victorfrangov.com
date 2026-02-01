import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
}

export default function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  links,
}: Props) {
  const isVideo =
    !!image &&
    (image.toLowerCase().endsWith(".webm") ||
      image.toLowerCase().endsWith(".mp4"));

  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      {image && (
        <div className="relative w-full overflow-hidden rounded-t-lg">
          {isVideo ? (
            <video
              src={image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-contain max-h-56"
            />
          ) : (
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="w-full h-auto object-contain max-h-56"
              priority={false}
            />
          )}
        </div>
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <p>{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px] bg-black text-white dark:bg-white dark:text-black"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-2 px-2 py-1 text-[10px] bg-black text-white dark:bg-white dark:text-black"
                >
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