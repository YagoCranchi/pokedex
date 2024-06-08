export function FirstUpperCase(text: string): string {
    const finalText: string = text.toLowerCase();
    return finalText.charAt(0).toUpperCase() + finalText.slice(1);
}

export function FormatPokemonName(name: string): string {
    // Troca todos os "-" por espaço em branco
    let formattedName = name.replace(/-/g, ' ');

    // Deixa a primeira letra de todas as palavras em letra maiúscula
    formattedName = formattedName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedName;
}