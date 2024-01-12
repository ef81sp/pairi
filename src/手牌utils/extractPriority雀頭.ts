import { 牌 } from "../牌"
import { calcシャンテン数5ブロック } from "./calcシャンテン数"
import { extractSingleブロック } from "./extractSingleブロック"
import { extract塔子Tree, extract面子Tree, flatTrees } from "./extractブロックTree"
import {
  ExtractResult5ブロック,
  Result単体抽出,
  Result単体抽出Success,
  T手牌Suit別,
} from "./手牌utils.type"

export const extractPriority雀頭 = (手牌: T手牌Suit別): ExtractResult5ブロック[] => {
  const results: ExtractResult5ブロック[] = []
  const 雀頭List = extract雀頭(手牌)

  // ブロック(面子・塔子)を抽出する
  for (const 雀頭 of 雀頭List) {
    const 面子List = flatTrees(extract面子Tree(雀頭.rest))
    for (const 面子 of 面子List) {
      const 塔子List = flatTrees(extract塔子Tree(面子.rest))
      for (const 塔子 of 塔子List) {
        results.push({
          雀頭: 雀頭.ブロック,
          面子: 面子.ブロック,
          塔子: 塔子.ブロック,
          rest: 塔子.rest,
        })
      }
    }
  }

  // シャンテン数の低いもののみを残す
  const シャンテン数付きresult: [number, ExtractResult5ブロック][] = results.map((r) => [
    calcシャンテン数5ブロック(r),
    r,
  ])
  const min = Math.min(...シャンテン数付きresult.map(([s]) => s))
  const filteredResults = シャンテン数付きresult
    .filter(([シャンテン数]) => シャンテン数 === min)
    .map(([, r]) => r)

  return filteredResults
}

const extract雀頭 = (手牌: T手牌Suit別): Result単体抽出Success<"雀頭">[] => {
  const wholeResult: Result単体抽出<"雀頭">[] = []
  for (const suit of ["m", "p", "s", "z"] as const) {
    const 手牌suit = 手牌[suit]
    for (let i = 0; i < 手牌suit.length; i++) {
      wholeResult.push(extractSingleブロック(手牌, "雀頭", { suit: suit, index: i }))
    }
  }
  // failureを除外
  const successResult = wholeResult.filter(
    (r) => r.status === "success",
  ) as Result単体抽出Success<"雀頭">[]
  // 重複除去
  const uniqueResult = successResult.filter((r, i) => {
    const rStr = JSON.stringify(r)
    return successResult.findIndex((r2) => JSON.stringify(r2) === rStr) === i
  })
  return uniqueResult
}

if (import.meta.vitest) {
  test("雀頭抽出", () => {
    const result = extract雀頭({
      m: (["1m", "1m", "1m", "2m", "3m"] as const).map((s) => new 牌(s)),
      p: (["4p", "5p", "6p", "6p", "9p"] as const).map((s) => new 牌(s)),
      s: (["3s"] as const).map((s) => new 牌(s)),
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    })
    expect(result).toMatchSnapshot()
  })
}
