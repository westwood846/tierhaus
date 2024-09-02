import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-dvh bg-background-low p-2">
        <nav className="flex w-64 flex-col gap-2 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/animals" className="[&.active]:font-bold">
            Animals
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </nav>
        <main className="flex-1 rounded bg-background p-2">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
