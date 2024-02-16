"use client";

import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";

const Card = ({
  character,
  openModal,
}: {
  character: Character;
  openModal: (character: Character) => void;
}) => {
  const getImageUrl = () => {
    const match = character.url.match(/\d+/);
    const id = match ? match[0] : "0";
    return IMAGE_URL + `${id}.jpg`;
  };

  const imageUrl = getImageUrl();

  return (
    <div
      className="card bg-base-100 shadow-lg hover:z-10 hover:scale-105 hover:shadow-white hover:cursor-pointer"
      onClick={() => openModal(character)}
    >
      <figure className="mt-4">
        <Image
          className="rounded-xl"
          src={imageUrl}
          alt={character.name}
          height={160}
          width={160}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{character.name}</h2>
      </div>
    </div>
  );
};

export default Card;
