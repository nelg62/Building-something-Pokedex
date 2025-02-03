"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
}

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        if (!response.ok) throw new Error("Failed to fetch Pokemon list");
        const data = await response.json();
        const pokemonList: Pokemon[] = data.results;

        const pokemonDetails = pokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            id: details.id,
            name: details.name,
            sprite: details.sprites.front_default,
            types: details.types.map((t: PokemonType) => t.type.name),
            abilities: details.abilities.map(
              (a: PokemonAbility) => a.ability.name
            ),
          };
        });

        const fullDetails = await Promise.all(pokemonDetails);
        setPokemonData(fullDetails);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            {/* Pokémon Image */}
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 object-cover"
              height={100}
              width={100}
            />
            {/* Pokémon Name */}
            <h2 className="text-xl font-semibold capitalize mt-2">
              {pokemon.name}
            </h2>
            {/* Pokémon Types */}
            <p className="text-gray-600 text-sm mt-1">
              <strong>Type:</strong> {pokemon.types.join(", ")}
            </p>
            {/* Pokémon Abilities */}
            <p className="text-gray-600 text-sm mt-1">
              <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
