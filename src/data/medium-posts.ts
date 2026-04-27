export interface MediumPost {
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  isExternal?: boolean;
}

// TODO: Add your own Medium articles here when you publish them
// Example format:
// {
//   title: "Your Article Title",
//   url: "https://medium.com/@yourusername/your-article-slug",
//   publishedAt: "2026-01-15",
//   summary: "Brief description of the article.",
//   tags: ["Tag1", "Tag2"],
//   isExternal: true
// }

export const mediumPosts: MediumPost[] = [];

export function getMediumPosts(): MediumPost[] {
  return mediumPosts;
}