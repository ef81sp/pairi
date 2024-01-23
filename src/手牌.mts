import { Str牌 } from "./utils/types.mjs"
import { 副露 } from "./副露.mjs"
import { AnalysisResult13, analyze13 } from "./手牌utils/analyze手牌.mjs"
import { sort牌List, unique牌List } from "./手牌utils/utils/format牌List.mjs"
import { T手牌Suit別 } from "./手牌utils/手牌utils.type.mjs"
import { 牌 } from "./牌.mjs"

export type T手牌普通 =
  | [牌]
  | [牌, 牌, 牌, 牌]
  | [牌, 牌, 牌, 牌, 牌, 牌, 牌]
  | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
  | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
type T手牌副露 = [] | [副露] | [副露, 副露] | [副露, 副露, 副露] | [副露, 副露, 副露, 副露]
type analysisResult14 = Map<
  Str牌,
  {
    打牌: 牌
    analysisResult: AnalysisResult13
  }
>

/**
 * Represents 手牌.
 */
export class 手牌 {
  普通: T手牌普通
  副露: T手牌副露 = []
  ツモ: 牌 | null = null
  protected analysisResult13: AnalysisResult13 | null = null
  protected analysisResult14: analysisResult14 | null = null

  /**
   * Creates a new 手牌 instance.
   * @param 普通 The normal 牌s in the hand.
   * @param 副露 The melded 牌s in the hand.
   */
  constructor(普通: T手牌普通, 副露?: T手牌副露) {
    this.普通 = 普通
    if (副露) {
      this.副露 = 副露
    }
    this.sort()
    this.analyze13()
  }

  /**
   * Sorts the normal 牌s in the hand.
   */
  protected sort() {
    this.普通.sort((a, b) => {
      if (a.suit === b.suit) return a.number - b.number
      return a.suit.charCodeAt(0) - b.suit.charCodeAt(0)
    })
  }

  /**
   * Returns the 手牌's マンズ 牌s.
   * @returns The マンズ 牌s in the hand.
   */
  protected マンズ() {
    return this.普通.filter((p) => p.suit === "m")
  }

  /**
   * Returns the 手牌's ピンズ 牌s.
   * @returns The ピンズ 牌s in the hand.
   */
  protected ピンズ() {
    return this.普通.filter((p) => p.suit === "p")
  }

  /**
   * Returns the 手牌's ソーズ 牌s.
   * @returns The ソーズ 牌s in the hand.
   */
  protected ソーズ() {
    return this.普通.filter((p) => p.suit === "s")
  }

  /**
   * Returns the 手牌's 字牌 牌s.
   * @returns The 字牌 牌s in the hand.
   */
  protected 字牌() {
    return this.普通.filter((p) => p.suit === "z")
  }

  /**
   * Returns a string representation of the normal 牌s in the hand.
   * @returns A string representation of the normal 牌s.
   */
  toString普通() {
    return this.普通.map((p) => p.toString()).join("")
  }

  /**
   * Sets the ツモ 牌 in the hand and performs analysis for 14-牌 hand.
   * @param ツモ The ツモ 牌.
   */
  doツモ(ツモ: 牌) {
    this.ツモ = ツモ
    this.analyze14()
  }

  /**
   * Adds an melded set of 牌s to the hand and performs analysis for 14-牌 hand.
   * @param 副露 The melded set of 牌s.
   */
  do副露(副露: 副露) {
    if (this.副露.length === 4) throw new Error("副露できるのは4回まで")
    // 副露.ほかの牌 が 手牌に含まれていないといけない
    for (const p of 副露.other牌) {
      if (p === undefined) throw new Error("副露のほかの牌に undefined が含まれている")
      if (!this.普通.some((p2) => p2.toEqual(p))) {
        throw new Error(`手牌に ${p} がないのに副露しようとした`)
      }
    }

    this.副露 = [...this.副露, 副露]
    // 副露で使った牌を手牌から削除する
    for (const p of 副露.other牌) {
      if (p === undefined) throw new Error("副露のほかの牌に undefined が含まれている")
      const index = this.普通.findIndex((p2) => p2.toEqual(p))
      this.普通.splice(index, 1)
    }
    this.analyze14({ is副露後: true })
  }

  /**
   * Performs the specified 打牌 action in the hand.
   * @param 打牌 The 打牌 action to perform.
   */
  do打牌(
    打牌:
      | { type: "ツモ切り" }
      | { type: "ツモ後手出し"; 牌: 牌 }
      | { type: "副露後手出し"; 牌: 牌 },
  ): void {
    switch (打牌.type) {
      case "ツモ切り": {
        if (this.ツモ === null) throw new Error("ツモしていないのに打牌しようとした")
        this.ツモ = null
        break
      }
      case "ツモ後手出し": {
        if (this.ツモ === null) throw new Error("ツモしていないのに打牌しようとした")
        const index = this.普通.findIndex((p) => p.toEqual(打牌.牌))
        if (index === -1) throw new Error(`手牌に ${打牌.牌} がないのに打牌しようとした`)
        this.普通.splice(index, 1, this.ツモ)
        this.ツモ = null
        this.sort()
        break
      }
      case "副露後手出し": {
        const index = this.普通.findIndex((p) => p.toEqual(打牌.牌))
        if (index === -1) throw new Error(`手牌に ${打牌.牌} がないのに打牌しようとした`)
        this.普通.splice(index, 1)
        this.ツモ = null
        this.sort()
        break
      }
      default: {
        throw new Error(`invalid 打牌.type: ${打牌}`)
      }
    }
    this.analyze13()
  }

  /**
   * Returns the analysis result for 13-牌 hand.
   * @returns The analysis result for 13-牌 hand.
   */
  getAnalysisResult13() {
    return this.analysisResult13
  }

  /**
   * Returns the analysis result for 14-牌 hand.
   * @returns The analysis result for 14-牌 hand.
   */
  getAnalysisResult14() {
    return this.analysisResult14
  }

  /**
   * Returns a list of all 牌s in the hand, including normal and melded 牌s.
   * @returns A list of all 牌s in the hand.
   */
  牌List() {
    const _牌List = [...this.普通, ...this.副露.flatMap((f) => f.to牌List())]
    if (this.ツモ) _牌List.push(this.ツモ)

    return sort牌List(_牌List)
  }

  /**
   * Returns a list of all 牌s in the hand, excluding the ツモ 牌.
   * @returns A list of all 牌s in the hand, excluding the ツモ 牌.
   */
  牌ListExcludesツモ() {
    const _牌List = [...this.普通, ...this.副露.flatMap((f) => f.to牌List())]

    return sort牌List(_牌List)
  }

  /**
   * Performs analysis for 13-牌 hand.
   * @returns The analysis result for 13-牌 hand.
   */
  protected analyze13() {
    const analysisResult = analyze13(
      {
        m: this.マンズ(),
        p: this.ピンズ(),
        s: this.ソーズ(),
        z: this.字牌(),
      },
      this.牌List(),
    )
    this.analysisResult14 = null
    this.analysisResult13 = analysisResult
    return this.analysisResult13
  }

  /**
   * Performs analysis for 14-牌 hand.
   * @param is副露後 Indicates whether the analysis is performed after an melded set of 牌s is added.
   * @returns The analysis result for 14-牌 hand.
   */
  protected analyze14({ is副露後 } = { is副露後: false }): analysisResult14 {
    const hand = (() => {
      if (is副露後) return this.普通
      if (this.ツモ === null) throw new Error("ツモしていないのに analyze14 しようとした")
      return sort牌List([...this.普通, this.ツモ])
    })()
    const 打牌candidateList = unique牌List(hand)
    const result: analysisResult14 = new Map()
    // 打牌candidateList をループする
    for (const 牌 of 打牌candidateList) {
      const i = hand.findIndex((p) => p.toEqual(牌))
      result.set(牌.toString(), {
        打牌: 牌,
        analysisResult: analyze13(牌ListToSuit別(hand.toSpliced(i, 1)), this.牌List()),
      })
    }
    this.analysisResult13 = null
    this.analysisResult14 = result
    return this.analysisResult14
  }
}

const 牌ListToSuit別 = (牌List: 牌[]): T手牌Suit別 => {
  const 手牌Suit別: T手牌Suit別 = {
    m: [],
    p: [],
    s: [],
    z: [],
  }
  for (const 牌 of 牌List) {
    手牌Suit別[牌.suit].push(牌)
  }
  return 手牌Suit別
}
