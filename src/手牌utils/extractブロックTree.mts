import { extractSingleブロック } from "./extractSingleブロック.mjs"
import {
  type IntermediateExtractResult,
  type IntermediateExtractTree,
  type TブロックType,
  type T手牌Suit別,
  T面子,
} from "./手牌utils.type.mjs"

export const extract面子Tree = (手牌: T手牌Suit別): IntermediateExtractTree<"面子">[] => {
  const wholeResult: ReturnType<typeof extract面子Tree> = []
  for (const suit of ["m", "p", "s", "z"] as const) {
    const 手牌suit = 手牌[suit]
    for (let i = 0; i < 手牌suit.length; i++) {
      const result面子 = extractSingleブロック(手牌, "面子", { suit: suit, index: i })
      if (result面子.status === "failure") continue

      const children = extract面子Tree(result面子.rest)

      wholeResult.push({
        ブロック: result面子.ブロック,
        rest: result面子.rest,
        children,
      })
    }
  }

  return wholeResult
}

export const extract塔子Tree = (手牌: T手牌Suit別): IntermediateExtractTree<"塔子">[] => {
  const wholeResult: ReturnType<typeof extract塔子Tree> = []
  for (const suit of ["m", "p", "s", "z"] as const) {
    const 手牌suit = 手牌[suit]
    for (let i = 0; i < 手牌suit.length; i++) {
      const result塔子 = extractSingleブロック(手牌, "塔子", { suit: suit, index: i })
      if (result塔子.status === "failure") {
        continue
      }

      const children = extract塔子Tree(result塔子.rest)

      wholeResult.push({
        ブロック: result塔子.ブロック,
        rest: result塔子.rest,
        children,
      })
    }
  }

  // 塔子がない場合も、restを返さないといけない
  if (wholeResult.length === 0) {
    return [
      {
        ブロック: null,
        rest: 手牌,
        children: [],
      },
    ]
  }

  return wholeResult
}

export const extract対子Tree = (手牌: T手牌Suit別): IntermediateExtractTree<"対子">[] => {
  const wholeResult: ReturnType<typeof extract対子Tree> = []
  for (const suit of ["m", "p", "s", "z"] as const) {
    const 手牌suit = 手牌[suit]
    for (let i = 0; i < 手牌suit.length; i++) {
      const result対子 = extractSingleブロック(手牌, "対子", { suit: suit, index: i })
      if (result対子.status === "failure") {
        continue
      }

      const children = extract対子Tree(result対子.rest)

      wholeResult.push({
        ブロック: result対子.ブロック,
        rest: result対子.rest,
        children,
      })
    }
  }

  // 塔子がない場合も、restを返さないといけない
  if (wholeResult.length === 0) {
    return [
      {
        ブロック: null,
        rest: 手牌,
        children: [],
      },
    ]
  }

  return wholeResult
}

export const flatTree = <T extends TブロックType>(
  tree: IntermediateExtractTree<T>,
): IntermediateExtractResult<T>[] => {
  if (tree.children.length === 0) {
    return [
      {
        ブロック: tree.ブロック ? [tree.ブロック] : [],
        rest: tree.rest,
      },
    ]
  }

  const flatChildren = tree.children.flatMap(flatTree)

  const result = flatChildren.map((c) => ({
    ブロック: (tree.ブロック ? [tree.ブロック, ...c.ブロック] : [...c.ブロック]).sort((a, b) => {
      if (a == null) return 1
      if (b == null) return -1
      // component は、suit が m > p > s > z の順、そして数字が小さい順
      if (a.type === b.type) {
        if (a.component[0].suit === b.component[0].suit) {
          return a.component[0].number - b.component[0].number
        }
        return a.component[0].suit.charCodeAt(0) - b.component[0].suit.charCodeAt(0)
      }
      // type は、雀頭 > 面子 > 塔子 の順
      if (a.type === "雀頭") return -1
      if (b.type === "雀頭") return 1
      if (a.type === "面子") return -1
      if (b.type === "面子") return 1
      if (a.type === "塔子") return -1
      if (b.type === "塔子") return 1
      return 0
    }),
    rest: c.rest,
  }))

  return result
}

export const flatTrees = <T extends TブロックType>(
  trees: IntermediateExtractTree<T>[],
): IntermediateExtractResult<T>[] => {
  return trees.flatMap(flatTree).filter((r, i, arr) => {
    const rStr = JSON.stringify(r)
    return arr.findIndex((r2) => JSON.stringify(r2) === rStr) === i
  })
}
