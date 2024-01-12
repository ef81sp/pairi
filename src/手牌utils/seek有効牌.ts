import { isStr牌, 牌 } from "../牌"
import { countRequiredブロックnum } from "./countRequiredブロックnum"
import { count牌 } from "./count牌"
import {
  ExtractResult5ブロック,
  ExtractResult七対子,
  ExtractResult国士無双,
  T塔子,
  T手牌Suit別,
} from "./手牌utils.type"

export const seek有効牌5ブロック = (
  extractResult: ExtractResult5ブロック,
  シャンテン数: number,
): 牌[] => {
  if (シャンテン数 === 0) return seek有効牌5ブロックテンパイ(extractResult)
  return seek有効牌5ブロックノーテン(extractResult)
}

export const seek有効牌七対子 = (extractResult: ExtractResult七対子): 牌[] => {
  const result: 牌[] = []
  for (const rest of flattenRest(extractResult.rest)) {
    // 対子で使われている場合はskip
    if (extractResult.対子.some((対子) => 対子.component.some((p) => p.toEqual(rest)))) continue
    result.push(rest.clone())
  }
  return result
}

export const seek有効牌国士無双 = (extractResult: ExtractResult国士無双): 牌[] => {
  const target = (
    ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"] as const
  ).map((s) => new 牌(s))

  // 么九牌restが空(=雀頭がない)なら、すべての么九牌
  if (extractResult.么九牌rest.length === 0) return target

  // そうでない(雀頭がある)なら、么九牌uniqueに存在しないもの
  return target.filter((p) => !extractResult.么九牌unique.some((p2) => p2.toEqual(p)))
}
const seek有効牌5ブロックテンパイ = (extractResult: ExtractResult5ブロック): 牌[] => {
  if (extractResult.塔子.length >= 2) {
    throw new Error("塔子が2個以上ある場合は聴牌ではない")
  }
  if (extractResult.雀頭) {
    // 塔子が面子になる牌を求める
    if (extractResult.塔子[0] === undefined)
      throw new Error("雀頭があって塔子がない場合はテンパイではない")
    return seek塔子To面子(extractResult.塔子[0])
  }
  // 単騎待ち
  // restの中にひとつだけある牌を抽出する
  const rest = flattenRest(extractResult.rest)[0]
  if (rest === undefined) throw new Error(`invalid rest: ${extractResult.rest}`)
  const 牌str = rest.toString()
  return [new 牌(牌str)]
}

const seek有効牌5ブロックノーテン = (extractResult: ExtractResult5ブロック): 牌[] => {
  const result: 牌[] = []

  const required面子塔子num = countRequiredブロックnum(count牌(extractResult)) - 1 // 雀頭は除く
  const 面子塔子数 = extractResult.面子.length + extractResult.塔子.length

  for (const 塔子 of extractResult.塔子) {
    result.push(...seek塔子To面子(塔子))
  }

  // 雀頭以外のブロックが足りない場合のみ、①restが塔子になる牌 ②雀頭の牌 が有効牌になる
  if (面子塔子数 < required面子塔子num) {
    for (const rest of flattenRest(extractResult.rest)) {
      result.push(...seekRestTo塔子(rest))
    }
    if (extractResult.雀頭) {
      result.push(extractResult.雀頭.component[0].clone())
    }
  }

  if (!extractResult.雀頭) {
    // 雀頭がなく、雀頭以外のブロックが足りている場合、restは雀頭にならないといけない
    if (面子塔子数 === required面子塔子num) {
      result.push(...flattenRest(extractResult.rest))
    }

    // 雀頭がない場合は、塔子が雀頭になるケースもある
    for (const 塔子 of extractResult.塔子) {
      result.push(...塔子.component.map((p) => p.clone()))
    }
  }

  const uniqueResult = result
    .filter((p, i) => {
      return result.findIndex((p2) => p2.toEqual(p)) === i
    })
    .sort((a, b) => {
      if (a.suit === b.suit) return a.number - b.number
      return a.suit.charCodeAt(0) - b.suit.charCodeAt(0)
    })

  return uniqueResult
}

export const flattenRest = (rest: T手牌Suit別): 牌[] => {
  return Object.values(rest).flat()
}

const seek塔子To面子 = (塔子: T塔子): 牌[] => {
  const [牌1, 牌2] = 塔子.component

  switch (true) {
    // シャンポン (字牌はここにしか来ない)
    case 牌1.number === 牌2.number: {
      return [牌1.clone()]
    }
    // 辺張
    case 牌1.number === 1 && 牌2.number === 2: {
      return [new 牌(`3${牌1.suit}`)]
    }
    case 牌1.number === 8 && 牌2.number === 9: {
      return [new 牌(`7${牌1.suit}`)]
    }
    // 嵌張
    case 牌1.number === 牌2.number - 2: {
      const 牌str = `${牌1.number + 1}${牌1.suit}`
      if (!isStr牌(牌str)) throw new Error(`invalid 牌str: ${牌str}`)
      return [new 牌(牌str)]
    }
    // 両面 (辺張は先に弾いてるのでこれでよい)
    case 牌1.number === 牌2.number - 1: {
      const 牌str1 = `${牌1.number - 1}${牌1.suit}`
      const 牌str2 = `${牌2.number + 1}${牌2.suit}`
      if (!isStr牌(牌str1)) throw new Error(`invalid 牌str: ${牌str1}`)
      if (!isStr牌(牌str2)) throw new Error(`invalid 牌str: ${牌str2}`)
      return [new 牌(牌str1), new 牌(牌str2)]
    }
    default: {
      throw new Error(
        `invalid 塔子: ${塔子.component[0].toString()} ${塔子.component[1].toString()}`,
      )
    }
  }
}

const seekRestTo塔子 = (浮き牌: 牌): 牌[] => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  switch (浮き牌.suit) {
    // m, p, s なら、2つとなりまでの牌
    case "m":
    case "p":
    case "s": {
      const index = n.indexOf(浮き牌.number)
      const min = Math.max(0, index - 2)
      const max = Math.min(8, index + 2)
      const targetNum = n.slice(min, max + 1)

      return targetNum.map((n) => {
        const str = `${n}${浮き牌.suit}`
        if (!isStr牌(str)) throw new Error(`invalid str: ${str}`)
        return new 牌(str)
      })
    }
    // z なら、同じ牌
    case "z": {
      return [浮き牌.clone()]
    }
  }
}
