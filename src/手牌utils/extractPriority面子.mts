import type { 牌 } from "../牌.mjs"
import { calcシャンテン数5ブロック } from "./calcシャンテン数.mjs"
import { extract塔子Tree, extract面子Tree, flatTrees } from "./extractブロックTree.mjs"
import type { ExtractResult5ブロック, T手牌Suit別 } from "./手牌utils.type.mjs"

export const extractPriority面子 = (手牌: T手牌Suit別): ExtractResult5ブロック[] => {
  const results: ExtractResult5ブロック[] = []
  const 面子List = flatTrees(extract面子Tree(手牌))

  if (面子List.length > 0) {
    // ブロック(面子・塔子)を抽出する
    for (const 面子 of 面子List) {
      const 塔子List = flatTrees(extract塔子Tree(面子.rest))
      for (const 塔子 of 塔子List) {
        results.push({
          雀頭: null,
          面子: 面子.ブロック,
          塔子: 塔子.ブロック,
          rest: 塔子.rest,
        })
      }
    }
  } else {
    const 塔子List = flatTrees(extract塔子Tree(手牌))
    // 塔子がとれなくても、restだけを含んだ配列が返ってくるので、これで動く
    for (const 塔子 of 塔子List) {
      results.push({
        雀頭: null,
        面子: [],
        塔子: 塔子.ブロック,
        rest: 塔子.rest,
      })
    }
  }

  // 雀頭がなく、塔子として対子が抽出された場合、それは本来雀頭として抽出されるべきもの
  // extractPriority雀頭で抽出してあるので、この関数の結果からは除外する
  const filteredResults = results.filter((r) => !r.塔子.some((t) => is対子(...t.component)))

  // シャンテン数の低いもののみを残す
  const シャンテン数付きresult: [number, ExtractResult5ブロック][] = filteredResults.map((r) => [
    calcシャンテン数5ブロック(r),
    r,
  ])
  const min = Math.min(...シャンテン数付きresult.map(([s]) => s))
  const filteredResults2 = シャンテン数付きresult
    .filter(([シャンテン数]) => シャンテン数 === min)
    .map(([, r]) => r)

  return filteredResults2
}

const is対子 = (牌1: 牌, 牌2: 牌): boolean => {
  return 牌1.toEqual(牌2)
}
