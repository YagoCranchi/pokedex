import { getPokemon } from "../../lib/pokemonApi";
import { FormatPokemonName } from "../../utils/formatter";
import Link from "next/link";
import "../../public/css/types.scss";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { PokemonDetails } from "@/interfaces/pokemon";
import CardSkeleton from "./card-skeleton";

interface PokeCardProps {
  pokeName: string;
}

export default function PokeCard({ pokeName }: PokeCardProps) {
  const [pokeData, setPokeData] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    getPokemon(pokeName).then(data => setPokeData(data));
  }, [pokeName]);


  if (!pokeData) {
    return (
      <>
        <CardSkeleton />
      </>
    );
  }

  const pokemonName = pokeData.name;
  const pokemonImage = pokeData.sprites.front_default;
  const pokemonTypes = pokeData.types;
  const pokemonMainType = pokemonTypes[0].type.name;

  return (
    <>
      <Link
        key={pokemonName}
        href={`pokemon/` + pokemonName}
        className={
          "h-full sm:max-w-[250px] max-w-full w-full px-4 py-2 type-bg bg-hover rounded-md transition-all duration-300 text-white " +
          pokemonMainType
        }
      >
        <span className="block font-bold text-lg w-full text-center">
          {FormatPokemonName(pokemonName)}
        </span>
        <div className="flex">
          <div className="w-2/3">
            <Image
              src={pokemonImage}
              width={500}
              height={500}
              alt={pokemonName}
              priority={true}
              className="w-full"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2 mt-3">
            <div className="flex flex-col gap-3 w-fit">
              {pokemonTypes.map((types: any) => {
                return (
                  <span
                    key={types.type.name}
                    className={
                      "w-fit px-3 py-1 rounded-full type-bg-d20 " +
                      pokemonMainType
                    }
                  >
                    {FormatPokemonName(types.type.name)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
