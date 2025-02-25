"use client";
import {
  Pokemon,
  PokemonAbility,
  PokemonDetails,
  PokemonType,
} from "@/types/pokemonTypes";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );

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

  // open modal and set selected pokemon
  const handleCardClick = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData.map((pokemon) => (
          <Card
            pokemon={pokemon}
            key={pokemon.id}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPokemon?.name}
      >
        {selectedPokemon ? (
          <ModalContent pokemon={selectedPokemon} />
        ) : (
          <div></div>
        )}
      </Modal>
    </div>
  );
};

export default PokemonList;
