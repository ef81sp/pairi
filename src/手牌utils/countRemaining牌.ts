import { Str牌 } from "../utils/types"
import { 牌 } from "../牌"

export const countRemaining牌num = (
  target: 牌[],
  visible牌List: 牌[],
): Map<Str牌, { 牌: 牌; remains: number }> => {
  const map = new Map<Str牌, { 牌: 牌; remains: number }>(
    target.map((p) => [p.toString(), { 牌: p, remains: 4 }]),
  )
  for (const visible牌 of visible牌List) {
    const p = map.get(visible牌.toString())
    if (p) {
      p.remains -= 1
    }
  }
  return map
}
