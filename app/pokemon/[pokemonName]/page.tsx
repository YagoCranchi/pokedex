import { getPokemon } from "../../../lib/pokemonApi";
import Link from "next/link";


export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {
    const { pokemonName } = params;

    const pokemonObject = await getPokemon(pokemonName); 

    return(
        <>
            <Link href="/"> Home</Link>
            <img src={pokemonObject.sprites.front_default} alt={pokemonName} className="w-full" />
            <h1>{ pokemonObject.name }</h1>
        </>
    );
}