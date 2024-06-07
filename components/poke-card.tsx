import { getPokemon } from "../lib/pokemonApi";
import FirstUpperCase from "../utils/formatter";
import Link from "next/link";
import "../public/css/types.scss";
import Image from "next/image";

interface PokeCardProps {
  pokeList: any;
}

export default function PokeCard({ pokeList }: PokeCardProps) {
  return (
    <section className="flex w-11/12 gap-5 mx-auto my-5 flex-wrap">
      {pokeList.map(async (poke: any) => {
        const pokemonInfos = await getPokemon(poke.name);
        const pokemonName = pokemonInfos.name;
        const pokemonImage = pokemonInfos.sprites.front_default;
        const pokemonTypes = pokemonInfos.types;
        const pokemonMainType = pokemonTypes[0].type.name;

        return (
          <Link
            key={pokemonName}
            href={`pokemon/` + pokemonName}
            className={
              "type-bg bg-hover rounded-md h-full w-full transition-all duration-300 px-4 py-2 text-white " +
              pokemonMainType
            }
          >
            <div className="font-bold text-lg w-full text-center">
              {FirstUpperCase(pokemonName)}
            </div>
            <div className="flex">
              <div className="w-2/3">
                <Image src={pokemonImage} width={500} height={500} alt={pokemonName} className="w-full" />
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
                        {FirstUpperCase(types.type.name)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
