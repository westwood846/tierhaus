import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { execute } from "src/execute";
import { graphql } from "src/graphql";

export const Route = createLazyFileRoute("/animals/$animalId")({
  component: AnimalDetails,
});

const animalQuery = graphql(`
  query Animal($animalId: uuid!) {
    animals_by_pk(id: $animalId) {
      name
      id
      species
      born_at
      weight_grams
    }
  }
`);

function AnimalDetails() {
  const { animalId } = Route.useParams();

  const { data } = useQuery({
    queryKey: ["animals"],
    queryFn: () => execute(animalQuery, { animalId }),
  });

  const animal = data?.animals_by_pk;

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <h1>{animal.name}</h1>
      <p>ID: {animal.id}</p>
      <p>Species: {animal.species}</p>
      <p>
        Age: {new Date().getFullYear() - new Date(animal.born_at).getFullYear()}{" "}
        y/o
      </p>
      <p>Weight: {(animal.weight_grams / 1000).toFixed(2)} kg</p>
    </div>
  );
}
