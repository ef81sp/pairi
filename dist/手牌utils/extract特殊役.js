import { extract対子Tree, flatTrees } from "./extractブロックTree";
export const extract七対子 = (手牌) => {
    const 七対子 = flatTrees(extract対子Tree(手牌))[0];
    if (七対子 === undefined) {
        return {
            対子: [],
            rest: 手牌,
        };
    }
    return {
        対子: 七対子.ブロック,
        rest: 七対子.rest,
    };
};
export const extract国士無双 = (手牌) => {
    const 么九牌unique = [];
    const 么九牌rest = [];
    const rest = {
        m: [],
        p: [],
        s: [],
        z: [],
    };
    for (const suit of ["m", "p", "s"]) {
        for (const 牌 of 手牌[suit]) {
            if (牌.number === 1 || 牌.number === 9) {
                if (!么九牌unique.find((p) => p.toString() === 牌.toString())) {
                    么九牌unique.push(牌);
                }
                else {
                    么九牌rest.push(牌);
                }
            }
            else {
                rest[suit].push(牌);
            }
        }
    }
    for (const 牌 of 手牌.z) {
        if (!么九牌unique.find((p) => p.toString() === 牌.toString())) {
            么九牌unique.push(牌);
        }
        else {
            么九牌rest.push(牌);
        }
    }
    return {
        么九牌unique,
        么九牌rest,
        rest,
    };
};
//# sourceMappingURL=extract%E7%89%B9%E6%AE%8A%E5%BD%B9.js.map