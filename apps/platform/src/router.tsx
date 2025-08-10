import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingComponent: () => (
      <div className="min-h-screen bg-black text-emerald-500 flex items-center justify-center">
        <div className="text-center p-8 font-mono">Loading route…</div>
      </div>
    ),
    defaultErrorComponent: ({ error }) => (
      <div className="min-h-screen bg-black text-emerald-500 flex items-center justify-center">
        <div className="text-center p-8 font-mono">
          <div className="text-2xl mb-2">[ERROR]</div>
          <div className="text-emerald-300">{error?.message ?? 'Unknown error'}</div>
        </div>
      </div>
    ),
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
