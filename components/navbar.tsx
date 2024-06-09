import Link from "next/link";
import SearchPokemon from "./ui/search-pokemon"

export default function NavBar() {
    return (
        <>
            <div>
                <div className="flex justify-between items-center p-4">
                    <Link href="/" className="text-2xl font-bold">Pokemon</Link>
                    <div className="flex gap-5">
                        <SearchPokemon />
                        {/* <nav>
                            <a href="/" className="mr-4">Home</a>
                            <a href="/pokemon/about">About</a>
                        </nav> */}
                    </div>
                </div>
            </div>
        </>
    );
}