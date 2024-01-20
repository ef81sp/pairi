import { countRequiredブロックnum } from "./countRequiredブロックnum.mjs"
import { count牌 } from "./count牌.mjs"
import {
  ExtractResult5ブロック,
  ExtractResult七対子,
  ExtractResult国士無双,
} from "./手牌utils.type.mjs"

export const calcシャンテン数5ブロック = (
  extractResult5ブロック: ExtractResult5ブロック,
): number => {
  const requiredブロックnum = countRequiredブロックnum(count牌(extractResult5ブロック))

  // いわゆる「8点法」を採用
  let シャンテン数 = 8

  // 手牌が短い場合、必要面子数が減る
  シャンテン数 -= (5 - requiredブロックnum) * 2

  // 面子の数 * 2点
  シャンテン数 -= extractResult5ブロック.面子.length * 2
  // 塔子の数 * 1点
  シャンテン数 -= extractResult5ブロック.塔子.length
  // 雀頭があれば 1点
  シャンテン数 -= extractResult5ブロック.雀頭 ? 1 : 0
  // 面子と塔子が5個以上あると +1点 (雀頭は関係ない)
  if (
    extractResult5ブロック.面子.length + extractResult5ブロック.塔子.length >=
    requiredブロックnum
  ) {
    シャンテン数 += 1
  }
  return シャンテン数
}

export const calcシャンテン数七対子 = (extractResult七対子: ExtractResult七対子): number => {
  return 6 - extractResult七対子.対子.length
}

export const calcシャンテン数国士無双 = (extractResult国士無双: ExtractResult国士無双): number => {
  return extractResult国士無双.么九牌rest.length === 0
    ? 13 - extractResult国士無双.么九牌unique.length
    : 12 - extractResult国士無双.么九牌unique.length
}
