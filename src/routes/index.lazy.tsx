import { createLazyFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { graphql } from "../graphql";
import { execute } from "../execute";

const animalsQuery = graphql(`
  query Animals {
    animals {
      name
      id
      species
      born_at
      weight_grams
    }
  }
`);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["animals"],
    queryFn: () => execute(animalsQuery),
  });
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Species</th>
            <th>Age</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data?.animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.id}</td>
              <td>{animal.species}</td>
              <td>
                {new Date().getFullYear() -
                  new Date(animal.born_at).getFullYear()}{" "}
                y/o
              </td>
              <td>{(animal.weight_grams / 1000).toFixed(2)} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
