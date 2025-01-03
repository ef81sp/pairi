import { generate牌ListForTest } from "./utils/testUtils"
import { shuffle } from "./utils/utils.mjs"
import { 副露 } from "./副露.mjs"
import { type T手牌普通, isT手牌普通, 手牌 } from "./手牌.mjs"
import { 牌 } from "./牌.mjs"

describe("手牌", () => {
  const arg: T手牌普通 = [
    new 牌("7z"),
    new 牌("6z"),
    new 牌("9s"),
    new 牌("5s"),
    new 牌("3s"),
    new 牌("8p"),
    new 牌("6p"),
    new 牌("2p"),
    new 牌("7m"),
    new 牌("6m"),
    new 牌("5m"),
    new 牌("2m"),
    new 牌("1m"),
  ]
  shuffle(arg)
  const t = new 手牌(arg)
  test("生成後にソートされる", () => {
    expect(t.普通).toEqual([
      new 牌("1m"),
      new 牌("2m"),
      new 牌("5m"),
      new 牌("6m"),
      new 牌("7m"),
      new 牌("2p"),
      new 牌("6p"),
      new 牌("8p"),
      new 牌("3s"),
      new 牌("5s"),
      new 牌("9s"),
      new 牌("6z"),
      new 牌("7z"),
    ])
  })
  test("文字列化できる", () => {
    expect(t.toString普通()).toBe("1m2m5m6m7m2p6p8p3s5s9s6z7z")
  })
})
describe("文字列による初期化", () => {
  const t = new 手牌("1236m456p789s123z")
  test("生成できる", () => {
    expect(t.普通).toEqual([
      new 牌("1m"),
      new 牌("2m"),
      new 牌("3m"),
      new 牌("6m"),
      new 牌("4p"),
      new 牌("5p"),
      new 牌("6p"),
      new 牌("7s"),
      new 牌("8s"),
      new 牌("9s"),
      new 牌("1z"),
      new 牌("2z"),
      new 牌("3z"),
    ])
  })
})
describe("手牌解析13", () => {
  const sample副露1 = new 副露({
    call: "ポン",
    called牌: new 牌("1m"),
    other牌: [new 牌("1m"), new 牌("1m")],
    from: "上家",
  })
  const sample副露2 = new 副露({
    call: "チー",
    called牌: new 牌("2p"),
    other牌: [new 牌("3p"), new 牌("4p")],
    from: "上家",
  })
  describe("テンパイ", () => {
    test("シャンポン", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("1m"),
        new 牌("1m"),
        new 牌("2p"),
        new 牌("2p"),
        new 牌("2p"),
        new 牌("5p"),
        new 牌("5p"),
        new 牌("4s"),
        new 牌("4s"),
        new 牌("4s"),
        new 牌("2z"),
        new 牌("2z"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([new 牌("5p"), new 牌("2z")])

      expect(analysis.remaining有効牌num).toEqual(
        new Map([
          ["5p", { 牌: new 牌("5p"), remains: 2 }],
          ["2z", { 牌: new 牌("2z"), remains: 2 }],
        ]),
      )
    })
    test("清一色", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("1m"),
        new 牌("1m"),
        new 牌("2m"),
        new 牌("3m"),
        new 牌("4m"),
        new 牌("5m"),
        new 牌("6m"),
        new 牌("7m"),
        new 牌("8m"),
        new 牌("9m"),
        new 牌("9m"),
        new 牌("9m"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")

      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([
        new 牌("1m"),
        new 牌("2m"),
        new 牌("3m"),
        new 牌("4m"),
        new 牌("5m"),
        new 牌("6m"),
        new 牌("7m"),
        new 牌("8m"),
        new 牌("9m"),
      ])
      expect(analysis.remaining有効牌num).toEqual(
        new Map([
          ["1m", { 牌: new 牌("1m"), remains: 1 }],
          ["2m", { 牌: new 牌("2m"), remains: 3 }],
          ["3m", { 牌: new 牌("3m"), remains: 3 }],
          ["4m", { 牌: new 牌("4m"), remains: 3 }],
          ["5m", { 牌: new 牌("5m"), remains: 3 }],
          ["6m", { 牌: new 牌("6m"), remains: 3 }],
          ["7m", { 牌: new 牌("7m"), remains: 3 }],
          ["8m", { 牌: new 牌("8m"), remains: 3 }],
          ["9m", { 牌: new 牌("9m"), remains: 1 }],
        ]),
      )
    })
    test("二盃口", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("1m"),
        new 牌("2m"),
        new 牌("2m"),
        new 牌("3m"),
        new 牌("3m"),
        new 牌("5p"),
        new 牌("5p"),
        new 牌("6p"),
        new 牌("6p"),
        new 牌("7p"),
        new 牌("2z"),
        new 牌("2z"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([new 牌("4p"), new 牌("7p")])
      expect(analysis.analysisResult.七対子.シャンテン数).toBe(0)
      expect(analysis.analysisResult.七対子.有効牌).toEqual([new 牌("7p")])
    })
    test("国士無双", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("9m"),
        new 牌("1p"),
        new 牌("9p"),
        new 牌("1s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
        new 牌("5z"),
        new 牌("6z"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([new 牌("7z")])
    })
    test("国士無双十三面", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("9m"),
        new 牌("1p"),
        new 牌("9p"),
        new 牌("1s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
        new 牌("5z"),
        new 牌("6z"),
        new 牌("7z"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([
        new 牌("1m"),
        new 牌("9m"),
        new 牌("1p"),
        new 牌("9p"),
        new 牌("1s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
        new 牌("5z"),
        new 牌("6z"),
        new 牌("7z"),
      ])
    })
    describe("7枚形多面張", () => {
      test("ノベタン", () => {
        const arg: T手牌普通 = [
          new 牌("2m"),
          new 牌("3m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("6m"),
          new 牌("7m"),
          new 牌("8m"),
        ]
        const t = new 手牌(arg, [sample副露1, sample副露2])
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(0)
        expect(analysis.有効牌).toEqual([new 牌("2m"), new 牌("5m"), new 牌("8m")])
      })
      test("ノベタン嵌張", () => {
        const arg: T手牌普通 = [
          new 牌("2m"),
          new 牌("2m"),
          new 牌("2m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("6m"),
          new 牌("7m"),
        ]
        const t = new 手牌(arg, [sample副露1, sample副露2])
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(0)
        expect(analysis.有効牌).toEqual([new 牌("3m"), new 牌("4m"), new 牌("7m")])
      })
      test("5面待ち", () => {
        const arg: T手牌普通 = [
          new 牌("2m"),
          new 牌("2m"),
          new 牌("2m"),
          new 牌("3m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("6m"),
        ]
        const t = new 手牌(arg, [sample副露1, sample副露2])
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(0)
        expect(analysis.有効牌).toEqual([
          new 牌("1m"),
          new 牌("3m"),
          new 牌("4m"),
          new 牌("6m"),
          new 牌("7m"),
        ])
      })
      test("順子 + シャンポン", () => {
        const arg: T手牌普通 = [
          new 牌("2m"),
          new 牌("3m"),
          new 牌("4m"),
          new 牌("4m"),
          new 牌("4m"),
          new 牌("3s"),
          new 牌("3s"),
          new 牌("3s"),
          new 牌("4s"),
          new 牌("5s"),
        ]
        const t = new 手牌(arg, [sample副露1])
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(0)
        expect(analysis.有効牌).toEqual([new 牌("1m"), new 牌("4m"), new 牌("3s"), new 牌("6s")])
      })
    })
    test("裸単騎", () => {
      const arg: T手牌普通 = [new 牌("2m")]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      expect(analysis.シャンテン数).toBe(0)
      expect(analysis.有効牌).toEqual([new 牌("2m")])
    })
    describe("4枚使い複合系", () => {
      const t = new 手牌(
        // biome-ignore format: みやすい
        generate牌ListForTest(
          ["2p", "3p", "4p", "4p", "4p", "4p", "5p", "6p", "7p", "7p"]
        ) as T手牌普通,
      )
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      test("テンパイ", () => {
        expect(analysis.シャンテン数).toBe(0)
      })
      test("有効牌に4枚使いが含まれる", () => {
        expect(analysis.有効牌).toEqual(generate牌ListForTest(["1p", "4p", "7p"]))
      })
    })
    describe("槓子形隣り合わせ", () => {
      const t = new 手牌(
        generate牌ListForTest(["2p", "2p", "2p", "2p", "3p", "3p", "3p"]) as T手牌普通,
      )
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")
      test("テンパイ", () => {
        expect(analysis.シャンテン数).toBe(0)
      })
      test("有効牌に4枚使いが含まれない", () => {
        expect(analysis.有効牌).toEqual(generate牌ListForTest(["1p", "4p"]))
      })
    })
  })
  describe("ノーテン", () => {
    describe("1シャンテン", () => {
      test("くっつき", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("1m"),
          new 牌("3m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("7p"),
          new 牌("5s"),
          new 牌("4z"),
          new 牌("4z"),
          new 牌("4z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([
          new 牌("1m"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("8p"),
          new 牌("9p"),
          new 牌("3s"),
          new 牌("4s"),
          new 牌("5s"),
          new 牌("6s"),
          new 牌("7s"),
        ])
      })
      test("リャンメンリャンメン", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("1m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("4s"),
          new 牌("5s"),
          new 牌("4z"),
          new 牌("4z"),
          new 牌("4z"),
          new 牌("7z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([new 牌("3m"), new 牌("6m"), new 牌("3s"), new 牌("6s")])
      })
      test("二盃口", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("1m"),
          new 牌("2m"),
          new 牌("2m"),
          new 牌("3m"),
          new 牌("3m"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("5p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("4z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")

        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([
          new 牌("3p"),
          new 牌("4p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("8p"),
          new 牌("4z"),
        ])
        expect(analysis.analysisResult.七対子.シャンテン数).toBe(1)
        expect(analysis.analysisResult.七対子.有効牌).toEqual([
          new 牌("6p"),
          new 牌("7p"),
          new 牌("4z"),
        ])
      })
      test("国士無双", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("9m"),
          new 牌("1p"),
          new 牌("9p"),
          new 牌("1s"),
          new 牌("9s"),
          new 牌("1z"),
          new 牌("1z"),
          new 牌("2z"),
          new 牌("3z"),
          new 牌("4z"),
          new 牌("5z"),
          new 牌("3z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")

        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([new 牌("6z"), new 牌("7z")])
      })
      test("国士無双十三面", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("2m"),
          new 牌("9m"),
          new 牌("1p"),
          new 牌("9p"),
          new 牌("1s"),
          new 牌("9s"),
          new 牌("1z"),
          new 牌("2z"),
          new 牌("3z"),
          new 牌("4z"),
          new 牌("5z"),
          new 牌("6z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")

        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([
          new 牌("1m"),
          new 牌("9m"),
          new 牌("1p"),
          new 牌("9p"),
          new 牌("1s"),
          new 牌("9s"),
          new 牌("1z"),
          new 牌("2z"),
          new 牌("3z"),
          new 牌("4z"),
          new 牌("5z"),
          new 牌("6z"),
          new 牌("7z"),
        ])
      })
      test("浮き牌ありヘッドレス", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("5m"),
          new 牌("6m"),
          new 牌("8m"),
          new 牌("8m"),
          new 牌("8m"),
          new 牌("9m"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([new 牌("1m"), new 牌("4m"), new 牌("7m"), new 牌("9m")])
      })
      test("ブロックオーバー", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("2m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("6m"),
          new 牌("5p"),
          new 牌("6p"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([
          new 牌("1m"),
          new 牌("2m"),
          new 牌("3m"),
          new 牌("4p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
        ])
      })
      describe("4枚使い", () => {
        describe("槓子形7枚", () => {
          const t = new 手牌(
            generate牌ListForTest(["2p", "2p", "2p", "2p", "5p", "5p", "5p"]) as T手牌普通,
          )
          const analysis = t.getAnalysisResult13()
          if (analysis === null) throw new Error("analysis is null")
          test("1シャンテンになる", () => {
            expect(analysis.シャンテン数).toBe(1)
          })
          test("手牌にある牌以外全てが有効牌になる", () => {
            expect(analysis.有効牌).toEqual(
              // biome-ignore format: みやすさ
              generate牌ListForTest([
                "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m",
                "1p",       "3p", "4p",       "6p", "7p", "8p", "9p",
                "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s",
                "1z", "2z", "3z", "4z", "5z", "6z", "7z",
              ]),
            )
          })
        })
      })
      test("0面子", () => {
        const arg: T手牌普通 = [
          new 牌("2m"),
          new 牌("4m"),
          new 牌("4m"),
          new 牌("6m"),
          new 牌("6m"),
          new 牌("8m"),
          new 牌("8m"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.シャンテン数).toBe(1)
        expect(analysis.有効牌).toEqual([
          new 牌("3m"),
          new 牌("4m"),
          new 牌("5m"),
          new 牌("6m"),
          new 牌("7m"),
          new 牌("8m"),
        ])
      })
      test("槓子2つ + 槓子隣の暗刻 + 両面", () => {
        const arg = generate牌ListForTest({
          s: "2222333568888",
        })
        if (!isT手牌普通(arg)) throw new Error("arg is not T手牌普通")
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        expect(analysis.有効牌).toEqual(
          generate牌ListForTest({
            s: "1457",
          }),
        )
      })
      describe("七対子", () => {
        describe("3枚使い", () => {
          const arg: T手牌普通 = [
            new 牌("1m"),
            new 牌("1m"),
            new 牌("1m"),
            new 牌("6m"),
            new 牌("6m"),
            new 牌("5p"),
            new 牌("5p"),
            new 牌("6p"),
            new 牌("6p"),
            new 牌("8p"),
            new 牌("8p"),
            new 牌("2z"),
            new 牌("2z"),
          ]
          const t = new 手牌(arg)
          const analysis = t.getAnalysisResult13()
          if (analysis === null) throw new Error("analysis is null")
          test("認められず、シャンテン数が1になる", () => {
            expect(analysis.シャンテン数).toBe(1)
            expect(analysis.analysisResult.七対子.シャンテン数).toBe(1)
          })
          test("かぶりのない牌がないので、有効牌が空になる", () => {
            expect(analysis.analysisResult.七対子.有効牌).toEqual([])
          })
        })
        describe("メンツ手でもイーシャンテン", () => {
          const arg = generate牌ListForTest({
            m: "1122355566899",
          })
          if (!isT手牌普通(arg)) throw new Error("arg is not T手牌普通")
          const t = new 手牌(arg)
          const analysis = t.getAnalysisResult13()
          if (analysis === null) throw new Error("analysis is null")

          test("メンツ手と七対子両方の有効牌が出る", () => {
            expect(analysis.有効牌).toEqual(
              generate牌ListForTest({
                m: "36789",
              }),
            )
          })
          describe("シャンテン数", () => {
            test("全体で1シャンテン", () => {
              expect(analysis.シャンテン数).toBe(1)
            })
            test("七対子は1シャンテン", () => {
              expect(analysis.analysisResult.七対子.シャンテン数).toBe(1)
            })
            test("メンツ手は1シャンテン", () => {
              expect(analysis.analysisResult._5ブロック.シャンテン数).toBe(1)
            })
          })
        })
      })
    })
    describe("2シャンテン", () => {
      test("二盃口", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("2m"),
          new 牌("2m"),
          new 牌("3m"),
          new 牌("3m"),
          new 牌("4p"),
          new 牌("4p"),
          new 牌("5p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("4z"),
          new 牌("6z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")

        expect(analysis.シャンテン数).toBe(2)
        expect(analysis.有効牌).toEqual([
          new 牌("1m"),
          new 牌("4m"),
          new 牌("3p"),
          new 牌("4p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("8p"),
          new 牌("4z"),
          new 牌("6z"),
        ])
        expect(analysis.analysisResult.七対子.シャンテン数).toBe(2)
        expect(analysis.analysisResult.七対子.有効牌).toEqual([
          new 牌("1m"),
          new 牌("6p"),
          new 牌("7p"),
          new 牌("4z"),
          new 牌("6z"),
        ])
      })
    })
    test("十三無靠", () => {
      const arg: T手牌普通 = [
        new 牌("1m"),
        new 牌("4m"),
        new 牌("7m"),
        new 牌("2p"),
        new 牌("5p"),
        new 牌("8p"),
        new 牌("3s"),
        new 牌("6s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
      ]
      const t = new 手牌(arg)
      const analysis = t.getAnalysisResult13()
      if (analysis === null) throw new Error("analysis is null")

      expect(analysis.シャンテン数).toBe(6)
      expect(analysis.analysisResult._5ブロック.シャンテン数).toBe(8)
      expect(analysis.analysisResult._5ブロック.有効牌).toEqual([
        new 牌("1m"),
        new 牌("2m"),
        new 牌("3m"),
        new 牌("4m"),
        new 牌("5m"),
        new 牌("6m"),
        new 牌("7m"),
        new 牌("8m"),
        new 牌("9m"),
        new 牌("1p"),
        new 牌("2p"),
        new 牌("3p"),
        new 牌("4p"),
        new 牌("5p"),
        new 牌("6p"),
        new 牌("7p"),
        new 牌("8p"),
        new 牌("9p"),
        new 牌("1s"),
        new 牌("2s"),
        new 牌("3s"),
        new 牌("4s"),
        new 牌("5s"),
        new 牌("6s"),
        new 牌("7s"),
        new 牌("8s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
      ])
      expect(analysis.analysisResult.七対子.シャンテン数).toBe(6)
      expect(analysis.analysisResult.七対子.有効牌).toEqual([
        new 牌("1m"),
        new 牌("4m"),
        new 牌("7m"),
        new 牌("2p"),
        new 牌("5p"),
        new 牌("8p"),
        new 牌("3s"),
        new 牌("6s"),
        new 牌("9s"),
        new 牌("1z"),
        new 牌("2z"),
        new 牌("3z"),
        new 牌("4z"),
      ])
    })
    describe("七対子", () => {
      describe("4枚使い", () => {
        const arg: T手牌普通 = [
          new 牌("1m"),
          new 牌("1m"),
          new 牌("1m"),
          new 牌("1m"),
          new 牌("6m"),
          new 牌("6m"),
          new 牌("5p"),
          new 牌("5p"),
          new 牌("6p"),
          new 牌("6p"),
          new 牌("8p"),
          new 牌("2z"),
          new 牌("2z"),
        ]
        const t = new 手牌(arg)
        const analysis = t.getAnalysisResult13()
        if (analysis === null) throw new Error("analysis is null")
        test("認められず、シャンテン数が2になる", () => {
          expect(analysis.シャンテン数).toBe(2)
          expect(analysis.analysisResult.七対子.シャンテン数).toBe(2)
        })
        test("対子で使われていない牌が有効牌", () => {
          expect(analysis.analysisResult.七対子.有効牌).toEqual(generate牌ListForTest(["8p"]))
        })
      })
    })
  })
})
// describe("手牌解析14", () => {
//   test("二盃口", () => {
//     const arg: T手牌普通 = [
//       new 牌("1m"),
//       new 牌("1m"),
//       new 牌("2m"),
//       new 牌("2m"),
//       new 牌("3m"),
//       new 牌("3m"),
//       new 牌("4p"),
//       new 牌("4p"),
//       new 牌("5p"),
//       new 牌("5p"),
//       new 牌("6p"),
//       new 牌("7p"),
//       new 牌("4z"),
//     ]
//     const t = new 手牌(arg)
//     t.doツモ(new 牌("7p"))
//     const analysis = t.getAnalysisResult14()
//     if (analysis === null) throw new Error("analysis is null")

//     expect(analysis.size).toBe(8)
//     expect(analysis).toMatchSnapshot()
//   })
//   test("ツモ牌を含めた4枚使いのカウントが正しい", () => {
//     const t = new 手牌([
//       new 牌("1s"),
//       new 牌("1s"),
//       new 牌("1s"),
//       new 牌("2s"),
//       new 牌("3s"),
//       new 牌("4s"),
//       new 牌("5s"),
//       new 牌("6s"),
//       new 牌("7s"),
//       new 牌("8s"),
//       new 牌("9s"),
//       new 牌("9s"),
//       new 牌("9s"),
//     ])
//     t.doツモ(new 牌("1s"))
//     const analysis = t.getAnalysisResult14()
//     if (analysis === null) throw new Error("analysis is null")
//     expect(analysis.get("2s")?.analysisResult.remaining有効牌num.get("1s")?.remains).toBe(0)
//     expect(analysis.get("2s")?.analysisResult.remaining有効牌num.get("2s")?.remains).toBe(3)
//   })
// })
