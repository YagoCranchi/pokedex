export default function FirstUpperCase(text: string): string {
    const finalText: string = text.toLowerCase();
    return finalText.charAt(0).toUpperCase() + finalText.slice(1);
}