import { Description, Field, Input, Label } from "@headlessui/react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx/lite";
import { execute } from "src/execute";
import { graphql } from "src/graphql";
import { queryClient } from "src/query-client";

const animalQuery = graphql(`
  query Animal($animalId: uuid!) {
    animals_by_pk(id: $animalId) {
      name
      id
      species
      born_at
      weight_grams
      description_visual
    }
  }
`);

const getQueryOptions = (params: { animalId: string }) =>
  queryOptions({
    queryKey: ["animals"],
    queryFn: () => execute(animalQuery, params),
  });

export const Route = createFileRoute("/animals/$animalId")({
  component: AnimalDetails,
  loader: ({ params }) => queryClient.ensureQueryData(getQueryOptions(params)),
});

function AnimalDetails() {
  const params = Route.useParams();
  const { data } = useSuspenseQuery(getQueryOptions(params));
  const animal = data.animals_by_pk;

  if (!animal) throw new Error("Animal not found");

  return (
    <div className="prose p-2">
      <h1>{animal.name}</h1>
      <p>ID: {animal.id}</p>
      <p>Species: {animal.species}</p>
      <p>
        Age: {new Date().getFullYear() - new Date(animal.born_at).getFullYear()}{" "}
        y/o
      </p>
      <p>Weight: {(animal.weight_grams / 1000).toFixed(2)} kg</p>
      <p>Description: {animal.description_visual}</p>
      <div>
        <Field>
        <Label className="text-sm/6 font-medium text-white">Name</Label>
        <Description className="text-sm/6 text-white/50">Change {animal.name}'s name.</Description>
        <Input
          className={clsx(
            'mt-3 block w-full rounded-lg py-1.5 px-3 border-2',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2'
          )}
        />
        </Field>
      </div>
    </div>
  );
}
