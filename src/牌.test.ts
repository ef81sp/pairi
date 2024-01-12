import { 牌 } from "./牌"
describe("牌のテスト", () => {
  test("suitが正しい", () => {
    expect(new 牌("1m").suit).toBe("m")
    expect(new 牌("9m").suit).toBe("m")
    expect(new 牌("1p").suit).toBe("p")
    expect(new 牌("9p").suit).toBe("p")
    expect(new 牌("1s").suit).toBe("s")
    expect(new 牌("9s").suit).toBe("s")
    expect(new 牌("1z").suit).toBe("z")
    expect(new 牌("7z").suit).toBe("z")
  })
  test("numberが正しい", () => {
    expect(new 牌("1m").number).toBe(1)
    expect(new 牌("1p").number).toBe(1)
    expect(new 牌("1s").number).toBe(1)
    expect(new 牌("1z").number).toBe(1)
    expect(new 牌("9m").number).toBe(9)
    expect(new 牌("9p").number).toBe(9)
    expect(new 牌("9s").number).toBe(9)
    expect(new 牌("7z").number).toBe(7)
  })
  test("5には赤を指定できる", () => {
    expect(new 牌("5m", true).is赤牌).toBe(true)
    expect(new 牌("5p", true).is赤牌).toBe(true)
    expect(new 牌("5s", true).is赤牌).toBe(true)
  })
  test("5以外には赤を指定できない", () => {
    expect(new 牌("1m", true).is赤牌).toBe(false)
    expect(new 牌("4m", true).is赤牌).toBe(false)
    expect(new 牌("6m", true).is赤牌).toBe(false)
    expect(new 牌("9m", true).is赤牌).toBe(false)
    expect(new 牌("1p", true).is赤牌).toBe(false)
    expect(new 牌("4p", true).is赤牌).toBe(false)
    expect(new 牌("6p", true).is赤牌).toBe(false)
    expect(new 牌("9p", true).is赤牌).toBe(false)
    expect(new 牌("1s", true).is赤牌).toBe(false)
    expect(new 牌("4s", true).is赤牌).toBe(false)
    expect(new 牌("6s", true).is赤牌).toBe(false)
    expect(new 牌("9s", true).is赤牌).toBe(false)
  })
  test("字牌には赤を指定できない", () => {
    expect(new 牌("1z", true).is赤牌).toBe(false)
    expect(new 牌("2z", true).is赤牌).toBe(false)
    expect(new 牌("3z", true).is赤牌).toBe(false)
    expect(new 牌("4z", true).is赤牌).toBe(false)
    expect(new 牌("5z", true).is赤牌).toBe(false)
    expect(new 牌("6z", true).is赤牌).toBe(false)
    expect(new 牌("7z", true).is赤牌).toBe(false)
  })
  test("toString()", () => {
    expect(new 牌("1m").toString()).toBe("1m")
    expect(new 牌("9m").toString()).toBe("9m")
    expect(new 牌("1p").toString()).toBe("1p")
    expect(new 牌("9p").toString()).toBe("9p")
    expect(new 牌("1s").toString()).toBe("1s")
    expect(new 牌("9s").toString()).toBe("9s")
    expect(new 牌("1z").toString()).toBe("1z")
    expect(new 牌("7z").toString()).toBe("7z")
  })
})
