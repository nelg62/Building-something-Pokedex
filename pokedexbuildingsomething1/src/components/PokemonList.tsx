"use client";
import {
  Pokemon,
  PokemonAbility,
  PokemonDetails,
  PokemonStat,
  PokemonType,
} from "@/types/pokemonTypes";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          fetchMorePokemon();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextUrl]
  );

  useEffect(() => {
    fetchMorePokemon();
  }, []);

  const fetchMorePokemon = async () => {
    if (!nextUrl) return;

    setLoading(true);
    try {
      const response = await fetch(nextUrl);
      if (!response.ok) throw new Error("Failed to fetch Pokemon list");
      const data = await response.json();

      const pokemonList: Pokemon[] = data.results;

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            sprite: details.sprites.front_default,
            shiny: details.sprites.front_shiny,
            types: details.types.map((t: PokemonType) => t.type.name),
            abilities: details.abilities.map(
              (a: PokemonAbility) => a.ability.name
            ),
            stats: details.stats.map((s: PokemonStat) => ({
              base_stat: s.base_stat,
              effort: s.effort,
              stat: { name: s.stat.name, url: s.stat.url },
            })),
          };
        })
      );

      setPokemonData((prev) => [...prev, ...pokemonDetails]);
      setNextUrl(data.next);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // open modal and set selected pokemon
  const handleCardClick = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  // if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData.map((pokemon, index) => {
          if (index === pokemonData.length - 1) {
            return (
              <div ref={lastPokemonRef} key={pokemon.id}>
                <Card
                  pokemon={pokemon}
                  onClick={() => handleCardClick(pokemon)}
                />
              </div>
            );
          }
          return (
            <Card
              pokemon={pokemon}
              key={pokemon.id}
              onClick={() => handleCardClick(pokemon)}
            />
          );
        })}
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-4">
          Loading more Pokémon...
        </p>
      )}

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
