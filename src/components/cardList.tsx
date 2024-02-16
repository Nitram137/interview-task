"use client";

import { useEffect, useState } from "react";
import Modal from "./modal";
import Card from "./card";

const CardList = ({
  peopleData,
  films,
}: {
  peopleData: SwapiResponse;
  films: Film[];
}) => {
  const [currentCharacter, setCurrentCharacter] = useState<
    Character | undefined
  >();

  const characters = peopleData.results as Character[];

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
      <div className="grid grid-cols-5 gap-6 w-2/3 my-4">
        {characters.map((character, index) => (
          <Card character={character} openModal={openModal} key={index} />
        ))}
      </div>
    </>
  );
};

export default CardList;
