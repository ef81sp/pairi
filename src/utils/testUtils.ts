import { Str牌 } from "./types.mjs"
import { 牌 } from "../牌.mjs"
import { ExtractResult七対子 } from "../手牌utils/手牌utils.type.mjs"

export const generateExtractResult七対子ForTest = (
  対子: [Str牌, Str牌][],
  rest: {
    [key in "m" | "p" | "s" | "z"]: Str牌[]
  },
): ExtractResult七対子 => {
  return {
    対子: 対子.map(([p1, p2]) => ({ component: [new 牌(p1), new 牌(p2)], type: "対子" })),
    rest: {
      m: rest.m.map((p) => new 牌(p)),
      p: rest.p.map((p) => new 牌(p)),
      s: rest.s.map((p) => new 牌(p)),
      z: rest.z.map((p) => new 牌(p)),
    },
  }
}

export const generate牌ListForTest = (str牌List: Str牌[]): 牌[] => {
  return str牌List.map((p) => new 牌(p))
}
