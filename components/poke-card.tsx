import { getPokemon } from "../lib/pokemonApi";
import FirstUpperCase from "../utils/formatter";
import Link from "next/link";

interface PokeCardProps {
    pokeList: any
}

export default function PokeCard( { pokeList } : PokeCardProps) {

    return(
        <section className="flex w-11/12 gap-5 mx-auto my-5 flex-wrap">
        {pokeList.map(async (poke : any) => {
            const pokemon = await getPokemon(poke.name);
            const pokemonImage = pokemon.sprites.front_default;
            return (
                <div className="p-3 bg-blue-100">
                    <img src={pokemonImage} alt="A pokemon" />
                    <Link key={poke.name} href={`pokemon/` + pokemon.name}>
                        <p>{FirstUpperCase(pokemon.name)}</p>
                    </Link>
                </div>
            );
        })}
        </section>
    );
}