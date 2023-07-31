import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POST = [
  { id: 1, name: "Oppenheimer" },
  { id: 2, name: "Barbie" },
  { id: 3, name: "Dune 2" },
];

function App() {

  function wait(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  const queryClient = useQueryClient()

  const postQuery = useQuery({
    queryKey: ["movie"],
    queryFn: () => wait(1000).then(() => [...POST]),
  });

  const newMovie = useMutation({
    mutationFn: (name) => {
      return wait(1000).then(() => POST.push({ id: crypto.randomUUID(), name }))
    }, onSuccess: () => {
      queryClient.invalidateQueries('movie')
    }
  })

  if (postQuery.isLoading) return <h1>Loading ......</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;




  return (
    <>
      This is React query tutorial.
      <div>
        {postQuery.data.map((movie) => (
          <div key={movie.id}>{movie.name}</div>
        ))}
      </div>
      <button onClick={() => newMovie.mutate("SpiderMan Across The Spider Verse")}>Add New</button>
    </>
  );
}



export default App;
