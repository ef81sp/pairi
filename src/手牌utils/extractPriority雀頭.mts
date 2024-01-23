import { 牌 } from "../牌.mjs"
import { calcシャンテン数5ブロック } from "./calcシャンテン数.mjs"
import { extractSingleブロック } from "./extractSingleブロック.mjs"
import { extract塔子Tree, extract面子Tree, flatTrees } from "./extractブロックTree.mjs"
import {
  ExtractResult5ブロック,
  IntermediateExtractResult,
  Result単体抽出,
  Result単体抽出Success,
  Tブロック,
  T手牌Suit別,
} from "./手牌utils.type.mjs"

export const extractPriority雀頭 = (手牌: T手牌Suit別): ExtractResult5ブロック[] => {
  const results: ExtractResult5ブロック[] = []
  const 雀頭List = extract雀頭(手牌)

  // ブロック(面子・塔子)を抽出する
  for (const 雀頭 of 雀頭List) {
    const 面子List = flatTrees(extract面子Tree(雀頭.rest))
    if (面子List.length > 0) {
      for (const 面子 of 面子List) {
        const 塔子List = flatTrees(extract塔子Tree(面子.rest))
        for (const 塔子 of 塔子List) {
          const _塔子 = exclude塔子sameAs雀頭(雀頭.ブロック, 塔子)
          results.push({
            雀頭: 雀頭.ブロック,
            面子: 面子.ブロック,
            塔子: _塔子.ブロック,
            rest: _塔子.rest,
          })
        }
      }
    } else {
      const 塔子List = flatTrees(extract塔子Tree(雀頭.rest))
      // 塔子がとれなくても、restだけを含んだ配列が返ってくるので、これで動く
      for (const 塔子 of 塔子List) {
        const _塔子 = exclude塔子sameAs雀頭(雀頭.ブロック, 塔子)
        // const _塔子 = 塔子
        results.push({
          雀頭: 雀頭.ブロック,
          面子: [],
          塔子: _塔子.ブロック,
          rest: _塔子.rest,
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

const exclude塔子sameAs雀頭 = (
  雀頭: Tブロック<"雀頭">,
  塔子: IntermediateExtractResult<"塔子">,
): IntermediateExtractResult<"塔子"> => {
  const result: IntermediateExtractResult<"塔子"> = {
    ブロック: [],
    rest: {
      m: 塔子.rest.m.map((p) => p.clone()),
      p: 塔子.rest.p.map((p) => p.clone()),
      s: 塔子.rest.s.map((p) => p.clone()),
      z: 塔子.rest.z.map((p) => p.clone()),
    },
  }
  for (const 塔子ブロック of 塔子.ブロック) {
    // 対子が雀頭と同じ場合は、restに入れる
    const [p1, p2] = 塔子ブロック.component
    if (p1.toEqual(p2) && p1.toEqual(雀頭.component[0])) {
      result.rest[p1.suit].push(p1)
      result.rest[p2.suit].push(p2)
    } else {
      result.ブロック.push(塔子ブロック)
    }
  }
  return result
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
