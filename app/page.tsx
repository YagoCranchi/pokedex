import { PokemonGrid } from "@/components/pokeList/poke-grid";
import { getPokemonList } from "@/lib/pokemonApi";

export default async function Home() {
  const pokemonList = await getPokemonList(151, 0);
  return (
    <main>
      <PokemonGrid pokemonList={pokemonList}/>
    </main>
  );
}
