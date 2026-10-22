import fs from "node:fs";
import path from "node:path";

export type Section = [string, string];

export type Chapter = {
  slug: string;
  number: string;
  group: string;
  title: string;
  lede: string;
  summary: string;
  duration: string;
  level: string;
  requires: string;
  outcome: string;
  stack: string;
  tags: string[];
  sections: Section[];
  extra: boolean;
};

const ROOT = process.cwd();

export const chapters: Chapter[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content", "chapters.json"), "utf8")
);

export const chapterSlugs = chapters.map((c) => c.slug);

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getBody(slug: string): string {
  return fs.readFileSync(path.join(ROOT, "content", "bodies", `${slug}.html`), "utf8");
}

export function getNeighbours(slug: string) {
  const i = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? chapters[i - 1] : null,
    next: i >= 0 && i < chapters.length - 1 ? chapters[i + 1] : null,
  };
}

export const groups = [...new Set(chapters.map((c) => c.group))];

export const totalMinutes = chapters
  .map((c) => parseInt(c.duration, 10) || 0)
  .reduce((a, b) => a + b, 0);
