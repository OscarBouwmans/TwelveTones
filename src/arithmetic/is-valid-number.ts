
/**
 * => typeof n === 'number' && isNaN(n)
 * @param n input number
 */
export function isValidNumber(...number: number[]): boolean {
    return number.every(n => typeof n === "number" && !isNaN(n) && n !== Infinity && n !== -Infinity)
}
