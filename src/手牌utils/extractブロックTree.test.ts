import { 牌 } from "../牌"
import { extract塔子Tree, extract面子Tree, flatTree } from "./extractブロックTree"

test("面子抽出", () => {
  const result = extract面子Tree({
    m: (["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m"] as const).map((s) => new 牌(s)),
    p: (["6p", "9p"] as const).map((s) => new 牌(s)),
    s: (["3s"] as const).map((s) => new 牌(s)),
    z: (["1z", "1z"] as const).map((s) => new 牌(s)),
  })
  expect(result).toMatchSnapshot()
})
test("面子抽出2", () => {
  const result = extract面子Tree({
    m: (["5m", "6m", "7m", "8m", "9m"] as const).map((s) => new 牌(s)),
    p: ([] as const).map((s) => new 牌(s)),
    s: ([] as const).map((s) => new 牌(s)),
    z: ([] as const).map((s) => new 牌(s)),
  })
  expect(result).toMatchSnapshot()
})
test("塔子抽出", () => {
  const result = extract塔子Tree({
    m: (["7m"] as const).map((s) => new 牌(s)),
    p: (["6p", "9p"] as const).map((s) => new 牌(s)),
    s: (["3s"] as const).map((s) => new 牌(s)),
    z: (["1z", "1z"] as const).map((s) => new 牌(s)),
  })
  expect(result).toMatchSnapshot()
})
test("flatTree", () => {
  const result = extract面子Tree({
    m: (["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m"] as const).map((s) => new 牌(s)),
    p: (["6p", "9p"] as const).map((s) => new 牌(s)),
    s: (["3s"] as const).map((s) => new 牌(s)),
    z: (["1z", "1z"] as const).map((s) => new 牌(s)),
  })
    .flatMap(flatTree)
    // 重複除去
    .filter((r, i, arr) => {
      const rStr = JSON.stringify(r)
      return arr.findIndex((r2) => JSON.stringify(r2) === rStr) === i
    })
  expect(result).toMatchSnapshot()
})
