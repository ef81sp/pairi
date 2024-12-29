import { flattenRest } from "./seek有効牌.mjs"
import { countRequiredブロックnum } from "./utils/countRequiredブロックnum.mjs"
import { count牌 } from "./utils/count牌.mjs"
import { is暗刻 } from "./utils/is暗刻.mjs"
import type {
  ExtractResult5ブロック,
  ExtractResult七対子,
  ExtractResult国士無双,
} from "./手牌utils.type.mjs"

export const calcシャンテン数5ブロック = (
  extractResult5ブロック: ExtractResult5ブロック,
): number => {
  const requiredブロックnum = countRequiredブロックnum(count牌(extractResult5ブロック))

  const required面子num = requiredブロックnum - 1
  const { 雀頭, 面子, 塔子, rest: _rest } = extractResult5ブロック
  const rest = flattenRest(_rest)

  // いわゆる「8点法」を採用
  let シャンテン数 = 8

  // 手牌が短い場合、必要面子数が減る
  シャンテン数 -= (5 - requiredブロックnum) * 2

  // 面子の数 * 2点
  シャンテン数 -= 面子.length * 2
  // 塔子の数 * 1点
  シャンテン数 -= 塔子.length
  // 雀頭があれば 1点
  シャンテン数 -= 雀頭 ? 1 : 0

  // 例外パターン
  // 面子と塔子が5個以上あると +1点 (雀頭は関係ない)
  if (面子.length + 塔子.length >= requiredブロックnum) {
    シャンテン数 += 1
  }
  // 雀頭と塔子が同一(4枚使い)だと +1点
  if (
    雀頭 &&
    塔子.some(
      (塔子) =>
        塔子.component[0].toEqual(塔子.component[1]) &&
        塔子.component[0].toEqual(雀頭.component[0]),
    )
  ) {
    シャンテン数 += 1
  }
  // ヘッドレスで浮き牌が暗刻で使われていると +1点
  if (!雀頭 && 面子.length + 塔子.length === required面子num) {
    const 暗刻List = 面子.filter((m) => is暗刻(m))
    if (rest.every((p) => 暗刻List.some((面子) => 面子.component[0].toEqual(p)))) {
      シャンテン数 += 1
    }
  }
  return シャンテン数
}
export const calcシャンテン数七対子 = (extractResult七対子: ExtractResult七対子): number => {
  let result = 6 - extractResult七対子.対子.length

  // 手牌の牌の種類が7種類未満の場合、足りない分だけシャンテン数が増える
  const uniqueFlattenRest = flattenRest(extractResult七対子.rest)
    .filter((p, index, array) => array.findIndex((p2) => p2.toEqual(p)) === index)
    .map((p) => p.toString())

  const unique牌List = Array.from(
    new Set([
      ...extractResult七対子.対子.map((対子) => 対子.component[0].toString()),
      ...uniqueFlattenRest,
    ]),
  )
  const kinds牌 = unique牌List.length
  if (kinds牌 < 7) {
    result += 7 - kinds牌
  }

  return result
}

export const calcシャンテン数国士無双 = (extractResult国士無双: ExtractResult国士無双): number => {
  return extractResult国士無双.么九牌rest.length === 0
    ? 13 - extractResult国士無双.么九牌unique.length
    : 12 - extractResult国士無双.么九牌unique.length
}
