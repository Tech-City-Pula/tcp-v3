import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingComponent: () => (
      <div>
        <div>Loading route…</div>
      </div>
    ),
    defaultErrorComponent: ({ error }) => (
      <div>
        <div>
          <div>[ERROR]</div>
          <div>{error?.message ?? 'Unknown error'}</div>
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
