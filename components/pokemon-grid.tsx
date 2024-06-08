"use client";
import PokeCard from "./poke-card";

interface PokemonGridProps {
  pokemonList: any;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  return (
    <>
      <div>
        <section className="flex w-11/12 gap-3 mx-auto my-5 flex-wrap justify-center">
          {pokemonList.map((pokemon: any) => {
            return <PokeCard key={pokemon.name} pokeName={pokemon.name} />;
          })}
        </section>
      </div>
    </>
  );
}
