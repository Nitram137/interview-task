"use client";

import { useEffect, useState } from "react";
import Modal from "./modal";
import Card from "./card";
import Search from "./search";
import Filter from "./filter";
import Pagination from "./pagination";

const CardList = ({
  peopleData,
  films,
}: {
  peopleData: SwapiResponse;
  films: Film[];
}) => {
  const characters = peopleData.results as Character[];
  const genders = Array.from(
    new Set(characters.map((character) => character.gender)),
  );
  const homeworlds = Array.from(
    new Set(characters.map((character) => character.homeworld)),
  );

  const [currentCharacter, setCurrentCharacter] = useState<
    Character | undefined
  >();

  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [homeworldFilter, setHomeworldFilter] = useState<string>("");

  useEffect(() => {
    const newFilteredCharacters = characters.filter((character) => {
      const genderCondition =
        genderFilter === "" || character.gender === genderFilter;
      const homeworldCondition =
        homeworldFilter === "" || character.homeworld === homeworldFilter;
      return genderCondition && homeworldCondition;
    });

    setFilteredCharacters(newFilteredCharacters);
  }, [characters, genderFilter, homeworldFilter]);

  const handleFilter = (filterValue: string, propertyToFilter: string) => {
    if (propertyToFilter === "gender") {
      setGenderFilter(filterValue);
    } else if (propertyToFilter === "homeworld") {
      setHomeworldFilter(filterValue);
    }
  };

  const openModal = (character: Character) => {
    setCurrentCharacter(character);
  };

  const closeModal = () => {
    setCurrentCharacter(undefined);
  };

  return (
    <>
      {currentCharacter && (
        <Modal
          currentCharacter={currentCharacter}
          films={films}
          closeModal={closeModal}
        />
      )}
      <div className="flex items-center justify-between gap-4 w-1/2">
        <Search />
        <Filter
          propertyToFilter="gender"
          options={genders}
          handleFilter={handleFilter}
        />
        <Filter
          propertyToFilter="homeworld"
          options={homeworlds}
          handleFilter={handleFilter}
        />
      </div>
      <div className="grid grid-cols-5 gap-6 w-2/3 my-4">
        {filteredCharacters.map((character, index) => (
          <Card character={character} openModal={openModal} key={index} />
        ))}
      </div>
      <div className="flex w-full justify-center mb-4">
        <Pagination
          hasPrevious={!!peopleData.previous}
          hasNext={!!peopleData.next}
        />
      </div>
    </>
  );
};

export default CardList;
