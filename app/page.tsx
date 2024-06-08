import NavBar from "@/components/navbar";
import { PokemonGrid } from "@/components/pokemon-grid";
import { getPokemonList } from "@/lib/pokemonApi";

export default async function Home() {
  const pokemonList = await getPokemonList(151, 0);
  return (
    <main>
      <NavBar/>
      <PokemonGrid pokemonList={pokemonList}/>
    </main>
  );
}
