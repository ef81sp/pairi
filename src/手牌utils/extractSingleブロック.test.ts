import { 牌 } from "../牌"
import { extractSingleブロック } from "./extractSingleブロック"
import { T手牌Suit別 } from "./手牌utils.type"

describe("単体抽出", () => {
  test("雀頭 - とれる", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "2m", "2m", "3m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "雀頭", { suit: "m", index: 2 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "雀頭",
        component: [new 牌("2m"), new 牌("2m")],
      },
      rest: {
        m: [new 牌("1m"), new 牌("1m"), new 牌("3m")],
        p: [],
        s: [],
        z: [new 牌("1z"), new 牌("1z")],
      },
    })
  })
  test("雀頭 - とれない", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "2m", "2m", "3m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "雀頭", { suit: "m", index: 1 })
    expect(result).toEqual({
      status: "failure",
    })
  })
  test("面子 - 順子とれる", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "2m", "2m", "3m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "面子", { suit: "m", index: 0 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "面子",
        component: [new 牌("1m"), new 牌("2m"), new 牌("3m")],
      },
      rest: {
        m: [new 牌("1m"), new 牌("2m")],
        p: [],
        s: [],
        z: [new 牌("1z"), new 牌("1z")],
      },
    })
  })
  test("面子 - 刻子とれる(刻子が優先される)", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "1m", "2m", "3m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "面子", { suit: "m", index: 0 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "面子",
        component: [new 牌("1m"), new 牌("1m"), new 牌("1m")],
      },
      rest: {
        m: [new 牌("2m"), new 牌("3m")],
        p: [],
        s: [],
        z: [new 牌("1z"), new 牌("1z")],
      },
    })
  })
  test("面子 - とれない", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "2m", "4m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "面子", { suit: "m", index: 1 })
    expect(result).toEqual({
      status: "failure",
    })
  })
  test("面子 - 刻子とれる - 字牌", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "1m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "1z", "1z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "面子", { suit: "z", index: 0 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "面子",
        component: [new 牌("1z"), new 牌("1z"), new 牌("1z")],
      },
      rest: {
        m: [new 牌("1m"), new 牌("1m"), new 牌("1m")],
        p: [],
        s: [],
        z: [],
      },
    })
  })
  test("面子 - 順子とれない - 字牌", () => {
    const 手牌: T手牌Suit別 = {
      m: (["1m", "1m", "2m"] as const).map((s) => new 牌(s)),
      p: [],
      s: [],
      z: (["1z", "2z", "3z"] as const).map((s) => new 牌(s)),
    }
    const result = extractSingleブロック(手牌, "面子", { suit: "z", index: 0 })
    expect(result).toEqual({
      status: "failure",
    })
  })
  test("塔子 - 対子とれる", () => {
    const 手牌: T手牌Suit別 = {
      m: [],
      p: [],
      s: (["1s", "1s", "2s", "5s"] as const).map((s) => new 牌(s)),
      z: [],
    }
    const result = extractSingleブロック(手牌, "塔子", { suit: "s", index: 0 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "塔子",
        component: [new 牌("1s"), new 牌("1s")],
      },
      rest: {
        m: [],
        p: [],
        s: [new 牌("2s"), new 牌("5s")],
        z: [],
      },
    })
  })
  test("塔子 - 順塔子とれる - 連続", () => {
    const 手牌: T手牌Suit別 = {
      m: [],
      p: [],
      s: (["1s", "1s", "2s"] as const).map((s) => new 牌(s)),
      z: [],
    }
    const result = extractSingleブロック(手牌, "塔子", { suit: "s", index: 1 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "塔子",
        component: [new 牌("1s"), new 牌("2s")],
      },
      rest: {
        m: [],
        p: [],
        s: [new 牌("1s")],
        z: [],
      },
    })
  })
  test("塔子 - 順塔子とれる - 連続 - 末尾", () => {
    const 手牌: T手牌Suit別 = {
      m: [],
      p: [],
      s: (["6s", "8s", "9s"] as const).map((s) => new 牌(s)),
      z: [],
    }
    const result = extractSingleブロック(手牌, "塔子", { suit: "s", index: 1 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "塔子",
        component: [new 牌("8s"), new 牌("9s")],
      },
      rest: {
        m: [],
        p: [],
        s: [new 牌("6s")],
        z: [],
      },
    })
  })
  test("塔子 - 順塔子とれる - 嵌張", () => {
    const 手牌: T手牌Suit別 = {
      m: [],
      p: [],
      s: (["1s", "3s", "4s"] as const).map((s) => new 牌(s)),
      z: [],
    }
    const result = extractSingleブロック(手牌, "塔子", { suit: "s", index: 0 })
    expect(result).toEqual({
      status: "success",
      ブロック: {
        type: "塔子",
        component: [new 牌("1s"), new 牌("3s")],
      },
      rest: {
        m: [],
        p: [],
        s: [new 牌("4s")],
        z: [],
      },
    })
  })
  test("塔子 - とれない", () => {
    const 手牌: T手牌Suit別 = {
      m: [],
      p: [],
      s: (["1s", "4s", "7s"] as const).map((s) => new 牌(s)),
      z: [],
    }
    const result = extractSingleブロック(手牌, "塔子", { suit: "s", index: 0 })
    expect(result).toEqual({
      status: "failure",
    })
  })
})
