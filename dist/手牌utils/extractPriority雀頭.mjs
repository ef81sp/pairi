import { 牌 } from "../牌.mjs";
import { calcシャンテン数5ブロック } from "./calcシャンテン数.mjs";
import { extractSingleブロック } from "./extractSingleブロック.mjs";
import { extract塔子Tree, extract面子Tree, flatTrees } from "./extractブロックTree.mjs";
export const extractPriority雀頭 = (手牌) => {
    const results = [];
    const 雀頭List = extract雀頭(手牌);
    for (const 雀頭 of 雀頭List) {
        const 面子List = flatTrees(extract面子Tree(雀頭.rest));
        if (面子List.length > 0) {
            for (const 面子 of 面子List) {
                const 塔子List = flatTrees(extract塔子Tree(面子.rest));
                for (const 塔子 of 塔子List) {
                    results.push({
                        雀頭: 雀頭.ブロック,
                        面子: 面子.ブロック,
                        塔子: 塔子.ブロック,
                        rest: 塔子.rest,
                    });
                }
            }
        }
        else {
            const 塔子List = flatTrees(extract塔子Tree(雀頭.rest));
            for (const 塔子 of 塔子List) {
                results.push({
                    雀頭: 雀頭.ブロック,
                    面子: [],
                    塔子: 塔子.ブロック,
                    rest: 塔子.rest,
                });
            }
        }
    }
    const シャンテン数付きresult = results.map((r) => [
        calcシャンテン数5ブロック(r),
        r,
    ]);
    const min = Math.min(...シャンテン数付きresult.map(([s]) => s));
    const filteredResults = シャンテン数付きresult
        .filter(([シャンテン数]) => シャンテン数 === min)
        .map(([, r]) => r);
    return filteredResults;
};
const extract雀頭 = (手牌) => {
    const wholeResult = [];
    for (const suit of ["m", "p", "s", "z"]) {
        const 手牌suit = 手牌[suit];
        for (let i = 0; i < 手牌suit.length; i++) {
            wholeResult.push(extractSingleブロック(手牌, "雀頭", { suit: suit, index: i }));
        }
    }
    const successResult = wholeResult.filter((r) => r.status === "success");
    const uniqueResult = successResult.filter((r, i) => {
        const rStr = JSON.stringify(r);
        return successResult.findIndex((r2) => JSON.stringify(r2) === rStr) === i;
    });
    return uniqueResult;
};
if (import.meta.vitest) {
    test("雀頭抽出", () => {
        const result = extract雀頭({
            m: ["1m", "1m", "1m", "2m", "3m"].map((s) => new 牌(s)),
            p: ["4p", "5p", "6p", "6p", "9p"].map((s) => new 牌(s)),
            s: ["3s"].map((s) => new 牌(s)),
            z: ["1z", "1z"].map((s) => new 牌(s)),
        });
        expect(result).toMatchSnapshot();
    });
}
//# sourceMappingURL=extractPriority%E9%9B%80%E9%A0%AD.mjs.map