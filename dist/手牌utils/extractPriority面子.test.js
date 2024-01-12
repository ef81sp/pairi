import { generate手牌Suit別ForTest } from "../utils/utils";
import { extractPriority面子 } from "./extractPriority面子";
test("通常 - 一向聴", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "2m", "3m", "4m", "5m", "6m"],
        p: ["4p", "5p", "6p"],
        s: ["5s", "6s"],
        z: ["1z", "2z"],
    });
    const result = extractPriority面子(手牌Suit別);
    expect(result).matchSnapshot();
});
test("通常 - 聴牌", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "2m", "3m", "4m", "4m", "4m"],
        p: ["4p", "5p", "6p"],
        s: ["5s", "6s", "7s"],
        z: ["1z"],
    });
    const result = extractPriority面子(手牌Suit別);
    expect(result).matchSnapshot();
});
test("通常 - 聴牌 - ノベタン", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "2m", "3m", "4m", "5m", "6m", "7m"],
        p: ["4p", "5p", "6p"],
        s: ["5s", "6s", "7s"],
        z: [],
    });
    const result = extractPriority面子(手牌Suit別);
    expect(result).matchSnapshot();
});
//# sourceMappingURL=extractPriority%E9%9D%A2%E5%AD%90.test.js.map