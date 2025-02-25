import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";

interface CardProp {
  pokemon: PokemonDetails;
  onClick: () => void;
}

const Card = ({ pokemon, onClick }: CardProp) => {
  return (
    <div
      key={pokemon.id}
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {/* Pokémon Image */}
      <Image
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-24 h-24 object-cover"
        height={100}
        width={100}
        priority
      />
      {/* Pokémon Name */}
      <h2 className="text-xl font-semibold capitalize mt-2">{pokemon.name}</h2>
      {/* Pokémon Types */}
      <p className="text-gray-600 text-sm mt-1">
        <strong>Type:</strong> {pokemon.types.join(", ")}
      </p>
      {/* Pokémon Abilities */}
      <p className="text-gray-600 text-sm mt-1">
        <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
      </p>
    </div>
  );
};

export default Card;
