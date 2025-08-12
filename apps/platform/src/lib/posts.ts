export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
}

export const posts: Post[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    content:
      "Next.js is a powerful React framework that makes building web applications easier and more efficient. In this comprehensive guide, we'll explore the key features that make Next.js stand out from other frameworks. From server-side rendering to automatic code splitting, Next.js provides everything you need to build modern web applications. We'll cover routing, data fetching, and deployment strategies that will help you create fast, scalable applications.",
    excerpt:
      'Learn the fundamentals of Next.js and how to build modern web applications with this powerful React framework.',
    date: '2024-01-15',
    author: 'John Doe',
  },
  {
    id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    content:
      "Tailwind CSS has revolutionized the way we approach styling in web development. This utility-first CSS framework allows developers to build custom designs without leaving their HTML. In this detailed tutorial, we'll explore advanced Tailwind techniques, custom configurations, and best practices for maintaining scalable stylesheets. You'll learn how to create responsive designs, implement dark mode, and optimize your CSS for production.",
    excerpt: 'Discover advanced techniques and best practices for using Tailwind CSS in your projects.',
    date: '2024-01-10',
    author: 'Jane Smith',
  },
  {
    id: '3',
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive',
    content:
      "React Hooks have transformed how we write React components, making functional components more powerful than ever before. This in-depth exploration covers not just the basics of useState and useEffect, but also advanced patterns with useContext, useReducer, and custom hooks. We'll build practical examples that demonstrate real-world usage patterns and performance optimization techniques that every React developer should know.",
    excerpt: 'Explore advanced React Hooks patterns and learn how to build more efficient components.',
    date: '2024-01-05',
    author: 'Mike Johnson',
  },
  {
    id: '4',
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices',
    content:
      "TypeScript brings type safety to JavaScript, but knowing how to use it effectively requires understanding its advanced features and best practices. This comprehensive guide covers everything from basic type annotations to advanced generic patterns, utility types, and module declaration strategies. We'll explore how to structure large TypeScript projects, configure strict type checking, and integrate TypeScript with popular frameworks and tools.",
    excerpt: 'Learn essential TypeScript patterns and practices for building robust applications.',
    date: '2023-12-28',
    author: 'Sarah Wilson',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function searchPosts(query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return posts;
  }
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
  );
}

export type SortOption = 'newest' | 'oldest' | 'most-words' | 'least-words';

const wordsRegex = /\s+/;

export function getWordCount(content: string): number {
  return content.trim().split(wordsRegex).length;
}

export function sortPosts(input: Post[], sortBy: SortOption): Post[] {
  const arr = [...input];
  switch (sortBy) {
    case 'newest':
      return arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'oldest':
      return arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case 'most-words':
      return arr.sort((a, b) => getWordCount(b.content) - getWordCount(a.content));
    case 'least-words':
      return arr.sort((a, b) => getWordCount(a.content) - getWordCount(b.content));
    default:
      return arr;
  }
}
