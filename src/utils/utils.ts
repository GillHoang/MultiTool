export function randomInRange(from: number, to: number) {
    const r = Math.random();
    return Math.floor(r * (to - from) + from);
}
