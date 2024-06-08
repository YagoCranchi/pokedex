import { getPokemon } from "../../../lib/pokemonApi";
import Link from "next/link";
import { PokemonImage } from "@/components/poke-image";
import { Progress } from "@/components/ui/progress";
import { FormatPokemonName } from "@/utils/formatter";

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;

  const pokemonObject = await getPokemon(pokemonName);
  const imageUrl =
    pokemonObject.sprites.other?.["official-artwork"]?.front_default;

  return (
    <>
      <Link href="/"> Home</Link>

      <h1>{FormatPokemonName(pokemonObject.name)}</h1>
      {imageUrl && (
        <div className="m-4 relative w-60 h-60">
          <PokemonImage image={imageUrl} name={pokemonName} />
        </div>
      )}
      <h3>Weight: {pokemonObject.weight}</h3>
      <div className="flex-col">
        {pokemonObject.stats.map((statObject: any) => {
          const statName = statObject.stat.name;
          const statValue = statObject.base_stat;

          return (
            <div
              className="flex items-stretch w[500px]"
              key={statName}
            >
              <h3 className="p-3 w-2/4">
                {statName} : {statValue}
              </h3>
              <Progress className="w-2/4 m-auto" value={statValue} />
            </div>
          );
        })}
      </div>
    </>
  );
}
