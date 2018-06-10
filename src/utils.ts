export const epsilon = 1e2;

export function round(value: number, e: number = epsilon): number {
    return Math.round(value * e) / e;
}
