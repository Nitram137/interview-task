import { Suspense } from "react";
import Loading from "./loading";
import Pagination from "../components/pagination";
import Search from "../components/search";
import CardList from "@/components/cardList";
import { fetchAllFilms, fetchFilteredPeople } from "@/utils/data";

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

  const peopleData = await fetchFilteredPeople(search, currentPage);
  const films = (await fetchAllFilms()) as Film[];

  return (
    <main className="flex items-center justify-around w-full flex-col min-h-screen">
      <h1 className="text-5xl font-bold my-4">Star Wars Characters</h1>
      <div className="flex items-center justify-between">
        <Search />
      </div>
      <Suspense key={search + currentPage} fallback={<Loading />}>
        <CardList peopleData={peopleData} films={films} />
        <div className="flex w-full justify-center mb-4">
          <Pagination
            hasPrevious={!!peopleData.previous}
            hasNext={!!peopleData.next}
          />
        </div>
      </Suspense>
    </main>
  );
};

export default Home;
