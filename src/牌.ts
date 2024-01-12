import { Number字牌, Number数牌, Str牌, Suit, Suit字牌, Suit数牌 } from "./utils/types"

/**
 * Represents a 牌 (Mahjong tile).
 */
export class 牌 {
  readonly suit: Suit
  readonly number: typeof this.suit extends Suit字牌 ? Number字牌 : Number数牌
  readonly is赤牌: boolean
  private readonly str牌: Str牌

  /**
   * Constructs a new 牌 instance.
   * @param pai - The string representation of the 牌.
   * @param isRed - Indicates whether the 牌 is a red tile.
   */
  constructor(pai: Str牌, isRed = false) {
    const { suit, number } = parsePaiString(pai)
    this.suit = suit
    this.number = number
    this.is赤牌 = (() => {
      if (suit === "z") return false
      return number === 5 && isRed
    })()
    this.str牌 = pai
  }

  /**
   * Returns the string representation of the 牌.
   * @returns The string representation of the 牌.
   */
  toString() {
    return this.str牌
  }

  /**
   * Checks if the 牌 is equal to another 牌.
   * @param pai - The 牌 to compare.
   * @returns `true` if the 牌 is equal to the specified 牌, `false` otherwise.
   */
  toEqual(pai: 牌) {
    return this.str牌 === pai.str牌
  }

  /**
   * Creates a clone of the 牌.
   * @returns A new 牌 instance that is a clone of the current 牌.
   */
  clone() {
    return new 牌(this.str牌, this.is赤牌)
  }
}

/**
 * Parses a string representation of a 牌 and returns the corresponding suit and number.
 * @param pai - The string representation of the 牌.
 * @returns An object containing the suit and number of the 牌.
 * @throws Error if the string representation is invalid.
 */
const parsePaiString = (
  pai: string,
): { suit: Suit数牌; number: Number数牌 } | { suit: Suit字牌; number: Number字牌 } => {
  if (pai.length !== 2) throw new Error(`invalid signature ${pai}: length must be 2.`)

  const number = Number(pai[0])
  const suit = pai[1]
  const numberErrorMessage = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`
  const numberErrorMessage数牌 = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`
  const numberErrorMessage字牌 = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6 or 7.`

  if (!Number.isInteger(number)) throw new Error(numberErrorMessage)
  if (suit === undefined || !["m", "p", "s", "z"].includes(suit))
    throw new Error(`invalid signature ${pai}: suit must be "m", "p", "s" or "z".`)

  if (["m", "p", "s"].includes(suit)) {
    if (!(1 <= number && number <= 9)) throw new Error(numberErrorMessage数牌)
    return {
      suit,
      number,
    } as { suit: Suit数牌; number: Number数牌 }
  }
  if (!(1 <= number && number <= 7)) throw new Error(numberErrorMessage字牌)
  return {
    suit,
    number,
  } as { suit: Suit字牌; number: Number字牌 }
}

/**
 * Checks if a string is a valid 牌.
 * @param str - The string to check.
 * @returns `true` if the string is a valid 牌, `false` otherwise.
 */
export const isStr牌 = (str: string): str is Str牌 => {
  if (str.length !== 2) return false
  const number = Number(str[0])
  const suit = str[1]
  if (!Number.isInteger(number)) return false
  if (suit === undefined) return false
  if (!["m", "p", "s", "z"].includes(suit)) return false
  if (["m", "p", "s"].includes(suit)) {
    if (!(1 <= number && number <= 9)) return false
  } else {
    if (!(1 <= number && number <= 7)) return false
  }
  return true
}
