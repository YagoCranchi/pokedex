import SearchPokemon from "./ui/search-pokemon"

export default function NavBar() {
    return (
        <>
            <div>
                <div className="flex justify-between items-center p-4">
                    <div className="text-2xl font-bold">Pokemon</div>
                    <div className="flex gap-5">
                        <SearchPokemon />
                        <nav>
                            <a href="/pokemon" className="mr-4">Home</a>
                            <a href="/pokemon/about">About</a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}