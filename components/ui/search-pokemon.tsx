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

    const lowerCaseSearchText = searchText.toLocaleLowerCase();

    const searchFilter = useCallback((pokemonList: any[]) => {
        return pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(lowerCaseSearchText)
        );
    }, [lowerCaseSearchText]);

    const fetchPokemonDetails = useCallback(async (value: string) => {
        if (value) {
            setSearchText(value);
            const limitedPokemonList = searchFilter(allPokeData).slice(0, 10);
            const pokemonPromises = limitedPokemonList.map((pokemon: any) => getPokemon(pokemon.name));
            const details = await Promise.all(pokemonPromises);
            setPokeData(details);
        } else {
            setSearchText("");
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
                    <ul className="absolute top-full left-0 bg-gray-400"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}>
                        {pokeData.map((pokemon: any) => {
                            return (
                                <li key={pokemon.name}>
                                    <Link
                                        className="py-2 px-3 flex"
                                        href={`pokemon/` + pokemon.name}
                                    >
                                        <Image
                                            src={pokemon.sprites.front_default}
                                            width={200}
                                            height={200}
                                            alt={pokemon.name}
                                            priority={true}
                                            className="w-full"
                                        />
                                        {FormatPokemonName(pokemon.name)}
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