export const resources = [
  {
    title: 'React & Routing',
    items: [
      {
        name: 'React Docs',
        href: 'https://react.dev/',
        description: 'Official React documentation.',
      },
      {
        name: 'TanStack Router',
        href: 'https://tanstack.com/router/latest',
        description: 'File-based routing, loaders, actions, and more.',
      },
      {
        name: 'TanStack Start',
        href: 'https://tanstack.com/router/latest/docs/framework/react-start',
        description: 'Full-stack React framework built on TanStack Router.',
      },
    ],
  },
  {
    title: 'Tooling',
    items: [
      {
        name: 'Vite',
        href: 'https://vitejs.dev/',
        description: 'Fast frontend tooling & dev server.',
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/docs/',
        description: 'TypeScript handbook and docs.',
      },
      {
        name: 'Zod',
        href: 'https://zod.dev/',
        description: 'Type-safe schema validation.',
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/docs',
        description: 'Utility-first CSS framework.',
      },
      {
        name: 'Biome',
        href: 'https://biomejs.dev/',
        description: 'Formatter and linter used in this repo.',
      },
      {
        name: 'pnpm Workspaces',
        href: 'https://pnpm.io/workspaces',
        description: 'Monorepo management with pnpm.',
      },
      {
        name: 'Next.js',
        href: 'https://nextjs.org/docs',
        description: 'React framework for production.',
      },
    ],
  },
  {
    title: 'Database & Backend',
    items: [
      {
        name: 'Drizzle ORM',
        href: 'https://orm.drizzle.team/',
        description: 'Type-safe ORM for SQL.',
      },
      {
        name: 'Supabase',
        href: 'https://supabase.com/docs',
        description: 'Open-source Firebase alternative.',
      },
    ],
  },
  {
    title: 'Email',
    items: [
      {
        name: 'React Email',
        href: 'https://react.email/',
        description: 'Build and preview emails with React.',
      },
    ],
  },
] as const;
