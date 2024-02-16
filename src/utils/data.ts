import { FILMS_URL, PEOPLE_URL } from "./constants";

export const fetchFilteredPeople = async (search = "", currentPage = "1") => {
  const res = await fetch(PEOPLE_URL + `?search=${search}&page=${currentPage}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const swapiPeopleResponse: SwapiResponse = await res.json();

  return swapiPeopleResponse;
};

export const fetchAllFilms = async () => {
  const res = await fetch(FILMS_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const swapiFilmResponse: SwapiResponse = await res.json();

  return swapiFilmResponse.results;
};
