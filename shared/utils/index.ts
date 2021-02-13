export default class Utils {
    public static ellipsisText(text: string, max: number): string {
        return text.length > max ? text.slice(0, -3) + "..." : text;
    }

    public static removeDoubleSpaces(str: string): string {
        return str.replace(/\s{2,}/g, " ");
    }
}
