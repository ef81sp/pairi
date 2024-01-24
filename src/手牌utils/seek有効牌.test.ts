import {
  generateExtractResult5ブロックForTest,
  generateExtractResult七対子ForTest,
  generate牌ListForTest,
} from "../utils/testUtils"
import { seek有効牌5ブロック, seek有効牌七対子 } from "./seek有効牌.mjs"
import { ExtractResult5ブロック, ExtractResult七対子 } from "./手牌utils.type.mjs"

describe("seek有効牌5ブロック", () => {
  describe("ノーテン", () => {
    describe("暗刻形4枚使い", () => {
      const extractResult5ブロック: ExtractResult5ブロック = generateExtractResult5ブロックForTest(
        null,
        [
          ["2m", "2m", "2m"],
          ["5m", "5m", "5m"],
          ["5z", "5z", "5z"],
        ],
        [["4p", "5p"]],
        {
          m: ["2m", "5m"],
          p: [],
          s: [],
          z: [],
        },
      )
      const result = seek有効牌5ブロック(extractResult5ブロック, 1)
      test("暗刻で使われている牌以外全部が有効牌", () => {
        // biome-ignore format: みやすい
        expect(result).toEqual(generate牌ListForTest([
          "1m",       "3m", "4m",       "6m", "7m", "8m", "9m",
          "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p",
          "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s",
          "1z", "2z", "3z", "4z",       "6z", "7z",
        ]))
      })
    })
    describe("4枚使い + その牌を含んだ塔子 + 塔子", () => {
      const extractResult5ブロック: ExtractResult5ブロック = generateExtractResult5ブロックForTest(
        null,
        [["7p", "7p", "7p"]],
        [
          ["4p", "5p"],
          ["5p", "7p"],
        ],
        {
          m: [],
          p: [],
          s: [],
          z: [],
        },
      )
      const result = seek有効牌5ブロック(extractResult5ブロック, 1)
      test("暗刻で使われている牌は有効牌に含まれない", () => {
        expect(result).toEqual(generate牌ListForTest(["3p", "4p", "5p", "6p"]))
      })
    })
  })
})

describe("seek有効牌七対子", () => {
  test("かぶりなし一向聴の場合、restに残っている牌", () => {
    const extractResult七対子: ExtractResult七対子 = generateExtractResult七対子ForTest(
      [
        ["1m", "1m"],
        ["2m", "2m"],
        ["3m", "3m"],
        ["4m", "4m"],
        ["5m", "5m"],
      ],
      {
        m: [],
        p: ["1p"],
        s: ["4s"],
        z: ["6z"],
      },
    )
    const result = seek有効牌七対子(extractResult七対子)
    expect(result).toEqual(generate牌ListForTest(["1p", "4s", "6z"]))
  })

  describe("かぶりがある場合、それ以外のrestの牌", () => {
    test("かぶり1枚", () => {
      const extractResult七対子: ExtractResult七対子 = generateExtractResult七対子ForTest(
        [
          ["1m", "1m"],
          ["2m", "2m"],
          ["3m", "3m"],
          ["4m", "4m"],
          ["5m", "5m"],
        ],
        {
          m: ["1m"],
          p: ["4p"],
          s: ["7s"],
          z: [],
        },
      )
      const result = seek有効牌七対子(extractResult七対子)
      expect(result.map((p) => p.toString())).toEqual(["4p", "7s"])
    })
    test("かぶり2枚", () => {
      const extractResult七対子: ExtractResult七対子 = generateExtractResult七対子ForTest(
        [
          ["1m", "1m"],
          ["2m", "2m"],
          ["3m", "3m"],
          ["4m", "4m"],
          ["5m", "5m"],
        ],
        {
          m: ["1m", "1m"],
          p: ["4p"],
          s: [],
          z: [],
        },
      )
      const result = seek有効牌七対子(extractResult七対子)
      expect(result).toHaveLength(1)
      expect(result.map((p) => p.toString())).toEqual(["4p"])
    })
  })
})
