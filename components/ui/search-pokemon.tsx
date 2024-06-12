"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import { Pokemon, PokemonDetails } from "@/interfaces/pokemon";
import { getAllPokemonList, getPokemon } from "@/lib/pokemonApi";
import { useKey } from "@/lib/utils";
import { FormatPokemonName } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./input";


export default function SearchPokemon() {
    const [allPokeData, setAllPokeData] = useState<Pokemon[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [pokeData, setPokeData] = useState<PokemonDetails[]>([]);
    const [isInputFocused, setInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllPokemonList().then((data) => {
            setAllPokeData(data);
        });
    }, []);

    const searchFilter = useCallback((pokemonList: any[], value: string) => {
        return pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(value.toLocaleLowerCase())
        );
    }, []);

    const fetchPokemonDetails = useCallback(async (value: string) => {
        setSearchText(value);

        if (value) {
            const limitedPokemonList = searchFilter(allPokeData, value).slice(0, 30);
            const pokemonPromises = limitedPokemonList.map((pokemon: any) => getPokemon(pokemon.name));
            const details = await Promise.all(pokemonPromises);
            setPokeData(details);
        } else {
            setPokeData([]);
        }
    }, [allPokeData, searchFilter]);

    const blurHandler = useCallback(() => {
        if (!isHovering) {
            setSearchText("");
            setInputFocused(false);
            setPokeData([]);
        }
    }, [isHovering]);

    useKey("k", inputRef);

    return (
        <>
            <div className="relative">
                <Input
                    type="text"
                    value={searchText}
                    id="pokemonName"
                    placeholder="Search for a Pokemon!"
                    ref={inputRef}
                    onChange={(e) => fetchPokemonDetails(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => blurHandler()}
                    autoComplete="off"
                />
                {(isInputFocused || isHovering) && (
                    <ul className="absolute top-full left-0 bg-white w-full shadow
                                   rounded-b-md z-10 max-h-[600px] overflow-y-auto
                                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                                   scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-5"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}>
                        {pokeData.map((pokemon: any) => {
                            return (
                                <li key={pokemon.name}>
                                    <Link
                                        className="py-2 px-3 flex justify-between gap-2 hover:bg-gray-100 transition-all duration-300"
                                        href={`pokemon/` + pokemon.name}
                                    >
                                        <div className="w-1/3">
                                            <Image
                                                src={pokemon.sprites.front_default}
                                                width={100}
                                                height={100}
                                                alt={pokemon.name}
                                                priority={true}
                                                className="w-full"
                                            />
                                        </div>
                                        <span className="w-2/3 flex justify-center flex-col">
                                            {FormatPokemonName(pokemon.name)}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}