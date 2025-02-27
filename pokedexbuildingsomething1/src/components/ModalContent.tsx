import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";
// import StatChart from "./StatChart";

interface ModalContentProps {
  pokemon: PokemonDetails;
}

const ModalContent = ({ pokemon }: ModalContentProps) => {
  const shortenStatName = (name: string) => {
    const statMap: { [key: string]: string } = {
      "special-attack": "SP. ATK",
      "special-defense": "SP. DEF",
    };
    return statMap[name] || name.toUpperCase();
  };
  return (
    <div>
      <div>
        <h1>{pokemon.name}</h1>
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-24 h-24 object-cover"
          height={100}
          width={100}
          priority
        />
        <Image
          src={pokemon.shiny}
          alt={pokemon.name}
          className="w-24 h-24 object-cover"
          height={100}
          width={100}
          priority
        />
      </div>

      {/* <StatChart stats={pokemon.stats} /> */}

      <div className="mt-2 w-full border-4 rounded border-black p-2 bg-cyan-400">
        {pokemon.stats.map((s) => (
          <div key={s.stat.name} className="mb-2">
            <p className="text-xs font-semibold">
              {shortenStatName(s.stat.name)}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${(s.base_stat / 150) * 100}%` }} // Normalized to 150 max stat
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-2 bg-gray-100 p-2 rounded-md text-black text-sm">
        {pokemon.stats.map((s) => (
          <p key={s.stat.name}>
            <strong>{s.stat.name.toUpperCase()}:</strong> {s.base_stat}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default ModalContent;
