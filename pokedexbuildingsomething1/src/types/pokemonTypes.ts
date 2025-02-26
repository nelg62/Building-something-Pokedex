export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprite: string;
  shiny: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
}
