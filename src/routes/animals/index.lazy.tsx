import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "src/graphql";
import { execute } from "src/execute";

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

export const Route = createLazyFileRoute("/animals/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["animals"],
    queryFn: () => execute(animalsQuery),
  });
  return (
    <div className="prose p-2">
      <h1>All animals</h1>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Name</th>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Species</th>
            <th className="border border-slate-300">Age</th>
            <th className="border border-slate-300">Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data?.animals.map((animal) => (
            <tr key={animal.id}>
              <td className="border border-slate-300">
                <Link
                  to={`/animals/$animalId`}
                  params={{
                    animalId: animal.id,
                  }}
                >
                  {animal.name}
                </Link>
              </td>
              <td className="border border-slate-300">{animal.id}</td>
              <td className="border border-slate-300">{animal.species}</td>
              <td className="border border-slate-300">
                {new Date().getFullYear() -
                  new Date(animal.born_at).getFullYear()}{" "}
                y/o
              </td>
              <td className="border border-slate-300">
                {(animal.weight_grams / 1000).toFixed(2)} kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
