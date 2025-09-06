/// <reference types="vite/client" />

import { Toaster } from '@repo/ui/components/shadcn/sonner';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import globalCss from '@/styles/globals.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: globalCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>not found</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Toaster />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      {/** biome-ignore lint/style/noHeadElement: Tanstack Start template */}
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
