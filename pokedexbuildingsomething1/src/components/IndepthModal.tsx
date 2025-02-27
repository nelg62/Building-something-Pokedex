import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";

interface ModalContentProps {
  pokemon: PokemonDetails;
}

const statColors: { [key: string]: string } = {
  hp: "bg-green",
  attack: "bg-red",
  defense: "bg-orange",
  "special-attack": "bg-pink",
  "special-defense": "bg-yellow",
  speed: "bg-blue",
};

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

const IndepthModal = ({ pokemon }: ModalContentProps) => {
  const shortenStatName = (name: string) => {
    const statMap: { [key: string]: string } = {
      "special-attack": "SP. ATK",
      "special-defense": "SP. DEF",
    };
    return statMap[name] || name.toUpperCase();
  };

  return (
    <div className="bg-blue-200 border-4 border-blue-500 p-4 rounded-lg w-[500px] mx-auto">
      <div className="flex justify-between items-center bg-blue-400 p-2 round-t-lg">
        <div className="flex items-center space-x-2">
          {/* <span className="text-pink-500 font-bold text-lg">♀</span> */}
          <span className="text-black text-lg font-bold">{pokemon.name}</span>
        </div>

        {/* Pokemon Types */}
        <div className="flex">
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
      </div>

      {/* Pokemon stat bars */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div className="space-y-2">
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span>{shortenStatName(stat.stat.name)}</span>
              <div
                className={`w-32 ${
                  statColors[String(stat.stat.name)]
                }-300 rounded-full h-3`}
              >
                <div
                  className={`${
                    statColors[String(stat.stat.name)]
                  }-500 h-3 rounded-full`}
                  style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* pokemon picture */}
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-full h-full object-cover m-auto"
          height={1000}
          width={1000}
          priority
        />

        {/* pokemon evolution line */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 object-cover mx-auto"
              height={100}
              width={100}
              priority
            />
            <span>➡️</span>
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 object-cover mx-auto"
              height={100}
              width={100}
              priority
            />
            <span>➡️</span>
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 object-cover mx-auto"
              height={100}
              width={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndepthModal;
