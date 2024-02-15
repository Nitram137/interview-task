import Card from "./components/card";

const baseUrl = "https://swapi.dev/api/people/?page=1";

const Home = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  if (!res) "Loading...";

  const swapiPeopleResponse: SwapiPeopleResponse = await res.json();

  const characters: Character[] = swapiPeopleResponse.results;

  return (
    <main className="flex items-center justify-around w-full flex-col min-h-screen">
      <h1 className="text-5xl font-bold mt-10">Star Wars Characters</h1>
      <div className="grid grid-cols-5 gap-6 w-2/3 my-10">
        {characters?.map((character, index) => (
          <Card character={character} id={index} key={index} />
        ))}
      </div>
    </main>
  );
};

export default Home;
