import { Suspense } from "react";
import Card from "./components/card";
import Loading from "./loading";
import Pagination from "./components/pagination";
import Search from "./components/search";

const baseUrl = "https://swapi.dev/api/people/";

const fetchFilteredData = async (search = "", currentPage = "1") => {
  const res = await fetch(baseUrl + `?search=${search}&page=${currentPage}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const swapiPeopleResponse: SwapiPeopleResponse = await res.json();

  return swapiPeopleResponse;
};

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) => {
  const search = searchParams?.search || "";
  const currentPage = searchParams?.page || "1";

  const data = await fetchFilteredData(search, currentPage);

  return (
    <main className="flex items-center justify-around w-full flex-col min-h-screen">
      <h1 className="text-5xl font-bold my-4">Star Wars Characters</h1>
      <div className="flex items-center justify-between">
        <Search />
      </div>
      <Suspense key={search + currentPage} fallback={<Loading />}>
        <div className="grid grid-cols-5 gap-6 w-2/3 my-4">
          {data.results?.map((character, index) => (
            <Card character={character} key={index} />
          ))}
        </div>
        <div className="flex w-full justify-center mb-4">
          <Pagination hasPrevious={!!data.previous} hasNext={!!data.next} />
        </div>
      </Suspense>
    </main>
  );
};

export default Home;
