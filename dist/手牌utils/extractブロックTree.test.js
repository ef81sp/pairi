import { 牌 } from "../牌";
import { extract塔子Tree, extract面子Tree, flatTree } from "./extractブロックTree";
test("面子抽出", () => {
    const result = extract面子Tree({
        m: ["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m"].map((s) => new 牌(s)),
        p: ["6p", "9p"].map((s) => new 牌(s)),
        s: ["3s"].map((s) => new 牌(s)),
        z: ["1z", "1z"].map((s) => new 牌(s)),
    });
    expect(result).toMatchSnapshot();
});
test("面子抽出2", () => {
    const result = extract面子Tree({
        m: ["5m", "6m", "7m", "8m", "9m"].map((s) => new 牌(s)),
        p: [].map((s) => new 牌(s)),
        s: [].map((s) => new 牌(s)),
        z: [].map((s) => new 牌(s)),
    });
    expect(result).toMatchSnapshot();
});
test("塔子抽出", () => {
    const result = extract塔子Tree({
        m: ["7m"].map((s) => new 牌(s)),
        p: ["6p", "9p"].map((s) => new 牌(s)),
        s: ["3s"].map((s) => new 牌(s)),
        z: ["1z", "1z"].map((s) => new 牌(s)),
    });
    expect(result).toMatchSnapshot();
});
test("flatTree", () => {
    const result = extract面子Tree({
        m: ["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m"].map((s) => new 牌(s)),
        p: ["6p", "9p"].map((s) => new 牌(s)),
        s: ["3s"].map((s) => new 牌(s)),
        z: ["1z", "1z"].map((s) => new 牌(s)),
    })
        .flatMap(flatTree)
        .filter((r, i, arr) => {
        const rStr = JSON.stringify(r);
        return arr.findIndex((r2) => JSON.stringify(r2) === rStr) === i;
    });
    expect(result).toMatchSnapshot();
});
//# sourceMappingURL=extract%E3%83%96%E3%83%AD%E3%83%83%E3%82%AFTree.test.js.map