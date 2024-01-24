import { Str牌 } from "../../utils/types.mjs"
import { 牌 } from "../../牌.mjs"

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

if (import.meta.vitest) {
  test("全枯れ", () => {
    const result = countRemaining牌num(
      [new 牌("1m")],
      [new 牌("1m"), new 牌("1m"), new 牌("1m"), new 牌("1m")],
    )
    expect(result.get("1m")).toEqual({ 牌: new 牌("1m"), remains: 0 })
  })
}
