import { getPokemonList } from "../lib/pokemonApi";
import PokeCard from "../components/poke-card";

export default async function Home() {

  const pokeList = await getPokemonList();

  return (
    <main>
      <PokeCard pokeList={pokeList} />
    </main>
  );
}
