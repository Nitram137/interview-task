import { FILMS_URL, PEOPLE_URL } from "./constants";

export const fetchPeople = async (search = "", currentPage = "1") => {
  try {
    const swapiPeopleResponse: SwapiResponse = await fetch(
      PEOPLE_URL + `?search=${search}&page=${currentPage}`,
    ).then((res) => res.json());

    if (!swapiPeopleResponse) {
      return { notFound: true };
    }

    return replaceHomeworldUrlWithNameInPeople(swapiPeopleResponse);
  } catch (error) {
    console.error("Error while fetching people: ", error);
  }
};

export const fetchAllFilms = async () => {
  try {
    const swapiFilmsResponse: SwapiResponse = await fetch(FILMS_URL).then(
      (res) => res.json(),
    );

    if (!swapiFilmsResponse) {
      return { notFound: true };
    }

    return swapiFilmsResponse.results;
  } catch (error) {
    console.error("Error while fetching films: ", error);
  }
};

const replaceHomeworldUrlWithNameInPeople = async (
  swapiPeopleResponse: SwapiResponse,
) => {
  const characters = swapiPeopleResponse.results as Character[];

  const homeworldUrls = Array.from(
    new Set(characters.map((character) => character.homeworld)),
  );

  const swapiHomeworlds = (await Promise.all(
    homeworldUrls.map((url) => {
      return fetch(url).then((res) => res.json());
    }),
  )) as Planet[];

  const alteredCharacters = characters.map((character) => {
    const homeworldName = swapiHomeworlds.find(
      (planet) => planet.url === character.homeworld,
    )?.name;
    if (homeworldName) character.homeworld = homeworldName;
    return character;
  });

  const alteredSwapiPeopleResponse = {
    ...swapiPeopleResponse,
    results: alteredCharacters,
  };

  return alteredSwapiPeopleResponse;
};
