"use client";

const Modal = ({
  currentCharacter,
  films,
  closeModal,
}: {
  currentCharacter: Character;
  films: Film[];
  closeModal: () => void;
}) => {
  const { name, height, mass, films: filmUrls } = currentCharacter;

  const filmTitles = films
    .filter((film) => filmUrls.includes(film.url))
    .map((film) => film.title);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => closeModal()}
        >
          ✕
        </button>
        <h2 className="font-bold text-xl">{name}</h2>
        <ul className="flex flex-row justify-evenly my-4">
          <li>{`Height: ${height} cm`}</li>
          <li>{`Mass: ${mass === "unknown" ? mass : mass + " kg"}`}</li>
        </ul>
        <h3 className="font-bold text-lg">{"Films: "}</h3>
        <ul className="list-disc pl-6">
          {filmTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
