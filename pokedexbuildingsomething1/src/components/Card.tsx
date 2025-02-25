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
      className="relative bg-red-500 border-4 border-black rounded-lg overflow-hidden p-4 flex flex-col items-center text-white cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>
      {/* Pokémon Image */}
      <div className="bg-gray-200 rounded-full p-2 border-2 border-black mt-4 mb-2">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-24 h-24 object-cover"
          height={100}
          width={100}
          priority
        />
      </div>
      {/* Pokémon Name */}
      <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
      {/* Pokémon Types */}
      <p className="text-black bg-yellow-300 rounded-full px-3 py-1 text-sm font-medium mb-1">
        <strong>Type:</strong> {pokemon.types.join(", ")}
      </p>
      {/* Pokémon Abilities */}
      <p className="text-black bg-blue-300 rounded-full px-3 py-1 text-sm font-medium">
        <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
      </p>

      <div className="absolute top-1 left-2 flex space-x-1">
        <div className="w-5 h-5 bg-blue-500 rounded-full border border-white"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Card;
