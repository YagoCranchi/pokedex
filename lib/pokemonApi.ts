import { PokeAPI } from "pokeapi-types";

const POKEMON_API = "https://pokeapi.co/api/v2/";

interface PokemonListResult {
    name: string;
    url: string;
}

export async function getPokemonList(limit: number, offset: number): Promise<PokemonListResult[]> {
    const response = await fetch(POKEMON_API + "pokemon?offset=" + offset + "&limit=" + limit);
    const data = await response.json();
    return data.results;
}

export async function getPokemon(pokeName: string): Promise<PokeAPI.Pokemon> {
    const response = await fetch(POKEMON_API + "pokemon/" + pokeName );
    return await response.json();
} 