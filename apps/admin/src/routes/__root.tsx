/// <reference types="vite/client" />

import { Toaster } from '@repo/ui/components/shadcn/sonner';
import themeCss from '@repo/ui/theme?url';
import { createRootRoute, HeadContent, Outlet, Scripts, useMatches } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import globalCss from '../styles/globals.css?url';

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
        href: themeCss,
      },
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
  const matches = useMatches();
  const isLoginPage = matches.some((match) => match.routeId === '/login');

  return (
    <RootDocument showNavbar={!isLoginPage}>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children, showNavbar }: Readonly<{ children: ReactNode; showNavbar: boolean }>) {
  return (
    <html lang="en-US">
      {/** biome-ignore lint/style/noHeadElement: Tanstack Start template */}
      <head>
        <HeadContent />
      </head>
      <body>
        {showNavbar && <Navbar />}
        {children}
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
