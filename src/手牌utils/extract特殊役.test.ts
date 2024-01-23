import { generate手牌Suit別ForTest } from "../utils/utils.mjs"
import { 牌 } from "../牌.mjs"
import { extract七対子, extract国士無双 } from "./extract特殊役.mjs"

describe("七対子", () => {
  test("一向聴", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
      m: ["1m", "1m", "4m", "4m"],
      p: ["8p", "8p", "9p", "9p"],
      s: ["5s", "6s", "7s"],
      z: ["7z", "7z"],
    })
    const result = extract七対子(手牌Suit別)
    expect(result.対子).toHaveLength(5)
    expect(result.rest).toEqual({
      m: [],
      p: [],
      s: (["5s", "6s", "7s"] as const).map((s) => new 牌(s)),
      z: [],
    })
  })

  test("聴牌", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
      m: ["1m", "1m", "4m", "4m"],
      p: ["8p", "8p", "9p", "9p"],
      s: ["6s", "6s", "7s"],
      z: ["7z", "7z"],
    })
    const result = extract七対子(手牌Suit別)
    expect(result.対子).toHaveLength(6)
    expect(result.rest).toEqual({
      m: [],
      p: [],
      s: [new 牌("7s")],
      z: [],
    })
  })

  test("4枚使いは認められない", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
      m: ["1m", "1m", "1m", "1m"],
      p: ["8p", "8p", "9p", "9p"],
      s: ["6s", "6s", "7s"],
      z: ["7z", "7z"],
    })
    const result = extract七対子(手牌Suit別)
    expect(result.対子).toHaveLength(5)
    expect(result.rest).toEqual({
      m: (["1m", "1m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [new 牌("7s")],
      z: [],
    })
  })

  test("3枚使いは認められない", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
      m: ["1m", "1m", "1m"],
      p: ["8p", "8p", "9p", "9p"],
      s: ["6s", "6s", "7s", "7s"],
      z: ["7z", "7z"],
    })
    const result = extract七対子(手牌Suit別)
    expect(result.対子).toHaveLength(6)
    expect(result.rest).toEqual({
      m: (["1m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: [],
    })
  })
})

test("国士無双 - 一向聴", () => {
  const 手牌Suit別 = generate手牌Suit別ForTest({
    m: ["1m", "8m", "9m"],
    p: ["1p", "9p"],
    s: ["1s", "9s"],
    z: ["1z", "2z", "3z", "4z", "5z", "6z"],
  })
  const result = extract国士無双(手牌Suit別)
  expect(result).matchSnapshot()
})
test("国士無双 - 聴牌", () => {
  const 手牌Suit別 = generate手牌Suit別ForTest({
    m: ["1m", "9m", "9m"],
    p: ["1p", "9p"],
    s: ["1s", "9s"],
    z: ["1z", "2z", "3z", "4z", "5z", "6z"],
  })
  const result = extract国士無双(手牌Suit別)
  expect(result).matchSnapshot()
})
