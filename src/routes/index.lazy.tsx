import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="prose px-4">
      <h1>Tierhaus</h1>
      <p>
        Welcome to the Tierhaus! We have a variety of animals for you to see.
      </p>
    </div>
  );
}
