import { Str牌 } from "../utils/types.mjs"
import { 牌 } from "../牌.mjs"
import {
  calcシャンテン数5ブロック,
  calcシャンテン数七対子,
  calcシャンテン数国士無双,
} from "./calcシャンテン数.mjs"
import { countRemaining牌num } from "./countRemaining牌.mjs"
import { extractPriority雀頭 } from "./extractPriority雀頭.mjs"
import { extractPriority面子 } from "./extractPriority面子.mjs"
import { extract七対子, extract国士無双 } from "./extract特殊役.mjs"
import { unique牌List } from "./format牌List.mjs"
import { seek有効牌5ブロック, seek有効牌七対子, seek有効牌国士無双 } from "./seek有効牌.mjs"
import { ExtractResult5ブロック, T手牌Suit別 } from "./手牌utils.type.mjs"

const analyze手牌13Memo = new Map<string, AnalysisResult手牌13>()
const addToMap = (key: string, value: AnalysisResult手牌13) => {
  analyze手牌13Memo.set(key, value)
  // Map が 3つを超えたら、古いものを削除する
  if (analyze手牌13Memo.size > 3) {
    const keys = Array.from(analyze手牌13Memo.keys())
    if (keys[0]) {
      analyze手牌13Memo.delete(keys[0])
    }
  }
}

type AnalysisResult13Common = {
  シャンテン数: number
  有効牌: 牌[]
}

type AnalysisResult5ブロックIndivisual = {
  シャンテン数: number
  ブロック: ExtractResult5ブロック
  有効牌: 牌[]
}

export type AnalysisResult手牌13 = {
  _5ブロック: AnalysisResult13Common & {
    indivisuals: AnalysisResult5ブロックIndivisual[]
  }
  七対子: AnalysisResult13Common
  国士無双: AnalysisResult13Common
}

export type AnalysisResult13 = {
  analysisResult: AnalysisResult手牌13
  シャンテン数: number
  有効牌: 牌[]
  remaining有効牌num: Map<
    Str牌,
    {
      牌: 牌
      remains: number
    }
  >
}

// 集約関数
export const analyze13 = (手牌Suit別: T手牌Suit別, used牌: 牌[]): AnalysisResult13 => {
  const analysisResult = analyze手牌13(手牌Suit別)

  const シャンテン数 = Math.min(
    analysisResult._5ブロック.シャンテン数,
    analysisResult.七対子.シャンテン数,
    analysisResult.国士無双.シャンテン数,
  )

  const 有効牌target = []
  if (シャンテン数 === analysisResult._5ブロック.シャンテン数) {
    有効牌target.push(...analysisResult._5ブロック.有効牌)
  }
  if (シャンテン数 === analysisResult.七対子.シャンテン数) {
    有効牌target.push(...analysisResult.七対子.有効牌)
  }
  if (シャンテン数 === analysisResult.国士無双.シャンテン数) {
    有効牌target.push(...analysisResult.国士無双.有効牌)
  }
  const 有効牌 = unique牌List(有効牌target)

  const remaining有効牌num = countRemaining牌num(有効牌, used牌)

  return {
    analysisResult,
    シャンテン数,
    有効牌,
    remaining有効牌num,
  }
}

// 手牌をブロックに分けて待ちを求める
const analyze手牌13 = (手牌Suit別: T手牌Suit別): AnalysisResult手牌13 => {
  // メモ化する
  const key =
    手牌Suit別.m.map((p) => p.toString()).join("") +
    手牌Suit別.p.map((p) => p.toString()).join("") +
    手牌Suit別.s.map((p) => p.toString()).join("") +
    手牌Suit別.z.map((p) => p.toString()).join("")

  const memo = analyze手牌13Memo.get(key)
  if (memo) {
    return memo
  }

  const result = {
    _5ブロック: analyze手牌5ブロック(手牌Suit別),
    七対子: analyze手牌七対子(手牌Suit別),
    国士無双: analyze手牌国士無双(手牌Suit別),
  }
  addToMap(key, result)

  return result
}

const analyze手牌5ブロック = (手牌Suit別: T手牌Suit別): AnalysisResult手牌13["_5ブロック"] => {
  const priority雀頭 = extractPriority雀頭(手牌Suit別)
  const priority面子 = extractPriority面子(手牌Suit別)
  // シャンテン数の最も低いものを抽出する
  const _シャンテン数5ブロック =
    priority雀頭.length + priority面子.length === 0
      ? 8
      : Math.min(...[...priority雀頭, ...priority面子].map((r) => calcシャンテン数5ブロック(r)))

  const _5ブロック = [...priority雀頭, ...priority面子].filter(
    (r) => calcシャンテン数5ブロック(r) === _シャンテン数5ブロック,
  )

  const indivisuals5ブロック = _5ブロック.map((b) => ({
    シャンテン数: _シャンテン数5ブロック,
    ブロック: b,
    有効牌: seek有効牌5ブロック(b, _シャンテン数5ブロック),
  }))

  // 有効牌を集約して、重複を除去する
  const 有効牌5ブロック = indivisuals5ブロック
    .flatMap((r) => r.有効牌)
    .filter((p, i, arr) => {
      return arr.findIndex((p2) => p2.suit === p.suit && p2.number === p.number) === i
    })
    .sort((a, b) => {
      if (a.suit === b.suit) return a.number - b.number
      return a.suit.charCodeAt(0) - b.suit.charCodeAt(0)
    })

  return {
    シャンテン数: _シャンテン数5ブロック,
    有効牌: 有効牌5ブロック,
    indivisuals: indivisuals5ブロック,
  }
}

const analyze手牌七対子 = (手牌Suit別: T手牌Suit別): AnalysisResult手牌13["七対子"] => {
  const 七対子 = extract七対子(手牌Suit別)
  const _シャンテン数七対子 = calcシャンテン数七対子(七対子)
  const 有効牌七対子 = seek有効牌七対子(七対子)
  return {
    シャンテン数: _シャンテン数七対子,
    有効牌: 有効牌七対子,
  }
}

const analyze手牌国士無双 = (手牌Suit別: T手牌Suit別): AnalysisResult手牌13["国士無双"] => {
  const 国士無双 = extract国士無双(手牌Suit別)
  const _シャンテン数国士無双 = calcシャンテン数国士無双(国士無双)
  const 有効牌国士無双 = seek有効牌国士無双(国士無双)
  return {
    シャンテン数: _シャンテン数国士無双,
    有効牌: 有効牌国士無双,
  }
}
