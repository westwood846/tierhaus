import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const fetchAnimals = async () =>
  fetch("http://localhost:8082/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
    {
  animals {
    name
		species
		created_at
		updated_at
		id
  }
}
    `,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);

function App() {
  const [count, setCount] = useState(0);

  const { isSuccess, data } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">{JSON.stringify({ data }, null, 2)}</p>
    </>
  );
}

export default App;
