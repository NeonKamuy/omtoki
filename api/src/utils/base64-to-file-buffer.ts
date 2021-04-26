export function base64ToFileBuffer(base64: string) {
    return Buffer.from(
        base64.replace(/^data:image\/[a-z]+;base64,/, ""),
        "base64"
    );
}