import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";

interface CardProp {
  pokemon: PokemonDetails;
  onClick: () => void;
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400 hover:bg-gray-500 transition",
  fire: "bg-red-500 hover:bg-red-600 transition",
  water: "bg-blue-500 hover:bg-blue-600 transition",
  grass: "bg-green-500 hover:bg-green-600 transition",
  electric: "bg-yellow-400 hover:bg-yellow-500 transition",
  ice: "bg-blue-300 hover:bg-blue-400 transition",
  fighting: "bg-red-700 hover:bg-red-800 transition",
  poison: "bg-purple-500 hover:bg-purple-600 transition",
  ground: "bg-yellow-600 hover:bg-yellow-700 transition",
  flying: "bg-indigo-400 hover:bg-indigo-500 transition",
  psychic: "bg-pink-500 hover:bg-pink-600 transition",
  bug: "bg-green-700 hover:bg-green-800 transition",
  rock: "bg-yellow-700 hover:bg-yellow-800 transition",
  ghost: "bg-purple-700 hover:bg-purple-800 transition",
  dragon: "bg-indigo-700 hover:bg-indigo-800 transition",
  dark: "bg-gray-700 hover:bg-gray-800 transition",
  steel: "bg-gray-500 hover:bg-gray-600 transition",
  fairy: "bg-pink-400 hover:bg-pink-500 transition",
};

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
      <div className="text-black bg-yellow-300 rounded-full px-3 py-1 text-sm font-medium mb-1 flex">
        <strong className="text-sm px-2 py-1">Type:</strong>{" "}
        {pokemon.types?.map((type, index) => (
          <div
            key={index}
            className={`text-white text-sm px-2 py-1 rounded-lg capitalize ${
              typeColors[String(type)] || "bg-gray-500"
            }`}
          >
            {String(type)}
          </div>
        )) || <span>No Types Available</span>}
      </div>
      {/* Pokémon Abilities */}
      <p className="text-black bg-blue-300 rounded-full px-3 py-1 text-sm font-medium">
        <strong className="text-sm px-2 py-1">Abilities:</strong>{" "}
        {pokemon.abilities.join(", ")}
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
