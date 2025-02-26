import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";

interface ModalContentProps {
  pokemon: PokemonDetails;
}

const ModalContent = ({ pokemon }: ModalContentProps) => {
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
    </div>
  );
};

export default ModalContent;
