import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingComponent: () => (
      <div className="flex min-h-screen items-center justify-center bg-black text-emerald-500">
        <div className="p-8 text-center font-mono">Loading route…</div>
      </div>
    ),
    defaultErrorComponent: ({ error }) => (
      <div className="flex min-h-screen items-center justify-center bg-black text-emerald-500">
        <div className="p-8 text-center font-mono">
          <div className="mb-2 text-2xl">[ERROR]</div>
          <div className="text-emerald-300">{error?.message ?? 'Unknown error'}</div>
        </div>
      </div>
    ),
  });

  return router;
}

declare module '@tanstack/react-router' {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: needs to override it
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
