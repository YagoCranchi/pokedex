import { getPokemonList } from "../lib/pokemonApi";
import PokeCard from "../components/poke-card";

export default async function Home() {

  const pokeList = await getPokemonList(151, 0);

  return (
    <main>
      <PokeCard pokeList={pokeList} />
    </main>
  );
}
