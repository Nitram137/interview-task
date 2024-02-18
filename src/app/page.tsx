import { Suspense } from "react";
import Loading from "./loading";
import CardList from "@/components/cardList";
import { fetchAllFilms, fetchPeople } from "@/utils/data";

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

  const peopleData = (await fetchPeople(search, currentPage)) as SwapiResponse;
  const films = (await fetchAllFilms()) as Film[];

  return (
    <main className="flex items-center justify-around w-full flex-col min-h-screen">
      <h1 className="text-5xl font-bold my-4">Star Wars Characters</h1>
      <Suspense key={search + currentPage} fallback={<Loading />}>
        <CardList peopleData={peopleData} films={films} />
      </Suspense>
    </main>
  );
};

export default Home;
