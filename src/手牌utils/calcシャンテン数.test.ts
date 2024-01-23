import { calcシャンテン数七対子 } from "./calcシャンテン数.mjs"
import { generateExtractResult七対子ForTest } from "../utils/testUtils"
import { ExtractResult七対子 } from "./手牌utils.type.mjs"

describe("calcシャンテン数七対子", () => {
  describe("かぶりなしの場合", () => {
    test("6対子の場合、テンパイで0が返る", () => {
      const extractResult七対子: ExtractResult七対子 = generateExtractResult七対子ForTest(
        [
          ["1m", "1m"],
          ["2m", "2m"],
          ["3m", "3m"],
          ["4m", "4m"],
          ["5m", "5m"],
          ["6m", "6m"],
        ],
        {
          m: [],
          p: ["1s"],
          s: [],
          z: [],
        },
      )
      const result = calcシャンテン数七対子(extractResult七対子)
      expect(result).toEqual(0)
    })
    test("5対子の場合、イーシャンテンで1が返る", () => {
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
      const result = calcシャンテン数七対子(extractResult七対子)
      expect(result).toEqual(1)
    })
  })
  describe("重複がある場合", () => {
    it("3枚使いはシャンテン数が1下がる", () => {
      const extractResult七対子: ExtractResult七対子 = generateExtractResult七対子ForTest(
        [
          ["1m", "1m"],
          ["2m", "2m"],
          ["3m", "3m"],
          ["4m", "4m"],
          ["5m", "5m"],
          ["6m", "6m"],
        ],
        {
          m: ["1m"],
          p: [],
          s: [],
          z: [],
        },
      )
      const result = calcシャンテン数七対子(extractResult七対子)
      expect(result).toEqual(1)
    })

    it("4枚使いは(実質)2下がる", () => {
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
          p: ["2p"],
          s: [],
          z: [],
        },
      )
      const result = calcシャンテン数七対子(extractResult七対子)
      expect(result).toEqual(2)
    })
  })
})
