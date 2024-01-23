import { generateExtractResult七対子ForTest, generate牌ListForTest } from "../utils/testUtils"
import { seek有効牌七対子 } from "./seek有効牌.mjs"
import { ExtractResult七対子 } from "./手牌utils.type.mjs"

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
          m: ["1m", ],
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
