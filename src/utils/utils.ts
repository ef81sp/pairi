import { 牌 } from "../牌"
import { Str牌 } from "./types"

export const shuffle = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const generate手牌Suit別ForTest = ({
  m,
  p,
  s,
  z,
}: {
  m: (Str牌 & `${number}m`)[]
  p: (Str牌 & `${number}p`)[]
  s: (Str牌 & `${number}s`)[]
  z: (Str牌 & `${number}z`)[]
}) => ({
  m: m.map((s) => new 牌(s)),
  p: p.map((s) => new 牌(s)),
  s: s.map((s) => new 牌(s)),
  z: z.map((s) => new 牌(s)),
})
