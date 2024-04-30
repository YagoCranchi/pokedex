import Link from "next/link";

interface PokeCardProps {
    pokeList: any
}

export default function PokeCard( { pokeList } : PokeCardProps) {
    console.log(pokeList);

    return(
        <>
        {pokeList.map((pokemon : any) => {
            return (
                <div>
                    <p>{pokemon.name}</p>
                </div>
            );
        })}        
        </>
    );
}