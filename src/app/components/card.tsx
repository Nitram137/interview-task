import Image from "next/image";

interface CardProps {
  character: Character;
  id: number;
}

const imageSourceUrl =
  "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/";

const Card = ({ character, id }: CardProps) => {
  const getImageUrl = (id: number) => {
    return imageSourceUrl + `${id}.jpg`;
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:z-10 hover:scale-105 hover:shadow-white">
      <figure className="mt-4">
        <Image
          className="rounded-xl"
          src={getImageUrl(id + 1)}
          alt={character.name}
          width={180}
          height={180}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{character.name}</h2>
      </div>
    </div>
  );
};

export default Card;
