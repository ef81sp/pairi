import { calcシャンテン数5ブロック } from "./calcシャンテン数";
import { extract塔子Tree, extract面子Tree, flatTrees } from "./extractブロックTree";
export const extractPriority面子 = (手牌) => {
    const results = [];
    const 面子List = flatTrees(extract面子Tree(手牌));
    if (面子List.length > 0) {
        for (const 面子 of 面子List) {
            const 塔子List = flatTrees(extract塔子Tree(面子.rest));
            for (const 塔子 of 塔子List) {
                results.push({
                    雀頭: null,
                    面子: 面子.ブロック,
                    塔子: 塔子.ブロック,
                    rest: 塔子.rest,
                });
            }
        }
    }
    else {
        const 塔子List = flatTrees(extract塔子Tree(手牌));
        for (const 塔子 of 塔子List) {
            results.push({
                雀頭: null,
                面子: [],
                塔子: 塔子.ブロック,
                rest: 塔子.rest,
            });
        }
    }
    const filteredResults = results.filter((r) => !r.塔子.some((t) => is対子(...t.component)));
    const シャンテン数付きresult = filteredResults.map((r) => [
        calcシャンテン数5ブロック(r),
        r,
    ]);
    const min = Math.min(...シャンテン数付きresult.map(([s]) => s));
    const filteredResults2 = シャンテン数付きresult
        .filter(([シャンテン数]) => シャンテン数 === min)
        .map(([, r]) => r);
    return filteredResults2;
};
const is対子 = (牌1, 牌2) => {
    return 牌1.toEqual(牌2);
};
//# sourceMappingURL=extractPriority%E9%9D%A2%E5%AD%90.js.map