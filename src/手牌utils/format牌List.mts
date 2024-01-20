import { 牌 } from "../牌.mjs"

export const sort牌List = (target: 牌[]): 牌[] => {
  return target.sort((a, b) => {
    if (a.suit === b.suit) return a.number - b.number
    return a.suit.charCodeAt(0) - b.suit.charCodeAt(0)
  })
}

export const unique牌List = (target: 牌[]): 牌[] => {
  // 重複除去
  return sort牌List(target).filter((p, i, arr) => {
    if (i === 0) return true

    const prev = arr[i - 1]
    if (prev === undefined) throw new Error("arr[i-1] is undefined")
    return !p.toEqual(prev)
  })
}
