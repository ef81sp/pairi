import { ExtractResult5ブロック, ExtractResult七対子 } from "../手牌utils/手牌utils.type.mjs"
import { 牌 } from "../牌.mjs"
import { Str牌 } from "./types.mjs"

type Rest = {
  [key in "m" | "p" | "s" | "z"]: Str牌[]
}

export const generateExtractResult七対子ForTest = (
  対子: [Str牌, Str牌][],
  rest: Rest,
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

export const generateExtractResult5ブロックForTest = (
  雀頭: [Str牌, Str牌] | null,
  面子: [Str牌, Str牌, Str牌][],
  塔子: [Str牌, Str牌][],
  rest: Rest,
): ExtractResult5ブロック => {
  return {
    雀頭: 雀頭 && {
      component: [new 牌(雀頭[0]), new 牌(雀頭[1])],
      type: "雀頭",
    },
    面子: 面子.map(([p1, p2, p3]) => ({
      component: [new 牌(p1), new 牌(p2), new 牌(p3)],
      type: "面子",
    })),
    塔子: 塔子.map(([p1, p2]) => ({
      component: [new 牌(p1), new 牌(p2)],
      type: "塔子",
    })),
    rest: {
      m: rest.m.map((p) => new 牌(p)),
      p: rest.p.map((p) => new 牌(p)),
      s: rest.s.map((p) => new 牌(p)),
      z: rest.z.map((p) => new 牌(p)),
    },
  }
}

export const generate牌ListForTest = (
  str牌List:
    | Str牌[]
    | {
        [key in "m" | "p" | "s" | "z"]?: string
      },
): 牌[] => {
  if (Array.isArray(str牌List)) {
    return str牌List.map((p) => new 牌(p))
  }
  return Object.entries(str牌List).flatMap(([suit, numbers]) => {
    return [...numbers].map((number) => new 牌(`${number}${suit}` as Str牌))
  })
}
