import Image from "next/image";

const imageSourceUrl =
  "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/";

const Card = ({ character }: { character: Character }) => {
  const getImageUrl = () => {
    const match = character.url.match(/\d+/);
    const id = match ? match[0] : "0";
    return imageSourceUrl + `${id}.jpg`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="card bg-base-100 shadow-lg hover:z-10 hover:scale-105 hover:shadow-white">
      <figure className="mt-4">
        <Image
          className="rounded-xl"
          src={imageUrl}
          alt={character.name}
          width={160}
          height={160}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{character.name}</h2>
      </div>
    </div>
  );
};

export default Card;
