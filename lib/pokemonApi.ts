import { PokeAPI } from "pokeapi-types";
import { Pokemon } from "@/interfaces/pokemon";

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(limit: number, offset: number): Promise<Pokemon[]> {
    const response = await fetch(POKEMON_API + "pokemon?offset=" + offset + "&limit=" + limit);
    const data = await response.json();
    return data.results;
}

export async function getAllPokemonList(): Promise<Pokemon[]> {
    const response = await fetch(POKEMON_API + "pokemon?limit=100000&offset=0");
    const data = await response.json();
    return data.results;
}

export async function getPokemon(pokeName: string): Promise<PokeAPI.Pokemon> {
    const response = await fetch(POKEMON_API + "pokemon/" + pokeName );
    return await response.json();
} 