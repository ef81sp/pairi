import { generate手牌Suit別ForTest } from "../utils/utils";
import { extractPriority雀頭 } from "./extractPriority雀頭";
test("通常 - 一向聴", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "2m", "3m", "4m", "5m", "6m", "7m"],
        p: ["4p", "5p", "6p"],
        s: ["5s"],
        z: ["1z", "1z"],
    });
    const result = extractPriority雀頭(手牌Suit別);
    expect(result).matchSnapshot();
});
test("通常 - 聴牌", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "2m", "3m", "4m", "4m", "4m"],
        p: ["4p", "5p", "6p"],
        s: ["5s", "6s"],
        z: ["1z", "1z"],
    });
    const result = extractPriority雀頭(手牌Suit別);
    expect(result).matchSnapshot();
});
test("通常 - 聴牌 - 多面", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["2m", "2m", "2m", "3m", "4m", "5m", "6m"],
        p: ["4p", "5p", "6p"],
        s: ["5s", "6s", "7s"],
        z: [],
    });
    const result = extractPriority雀頭(手牌Suit別);
    expect(result).matchSnapshot();
});
test("清一色", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "9m", "9m"],
        p: [],
        s: [],
        z: [],
    });
    const result = extractPriority雀頭(手牌Suit別);
    expect(result).matchSnapshot();
});
const makeEasyToRead = (result) => {
    return result.map((r) => ({
        雀頭: r.雀頭 ? r.雀頭.component.map((p) => p.toString()) : [],
        面子: r.面子.map((m) => m.component.map((p) => p.toString())),
        塔子: r.塔子.map((m) => m.component.map((p) => p.toString())),
        rest: {
            m: r.rest.m.map((p) => p.toString()),
            p: r.rest.p.map((p) => p.toString()),
            s: r.rest.s.map((p) => p.toString()),
            z: r.rest.z.map((p) => p.toString()),
        },
    }));
};
//# sourceMappingURL=extractPriority%E9%9B%80%E9%A0%AD.test.js.map