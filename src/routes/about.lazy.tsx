import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="prose px-4">
      <h1>About Tierhaus</h1>
      <p>
        Tierhaus is a next-generation animal shelter management system. We use
        the latest technology to ensure that our animals are well cared for and
        find loving homes. We are proud to be a part of the TanStack ecosystem.
      </p>
    </div>
  );
}
