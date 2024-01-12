import { generate手牌Suit別ForTest } from "../utils/utils";
import { extract七対子, extract国士無双 } from "./extract特殊役";
test("七対子 - 一向聴", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "1m", "4m", "4m"],
        p: ["8p", "8p", "9p", "9p"],
        s: ["5s", "6s", "7s"],
        z: ["7z", "7z"],
    });
    const result = extract七対子(手牌Suit別);
    expect(result).matchSnapshot();
});
test("七対子 - 聴牌", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "1m", "4m", "4m"],
        p: ["8p", "8p", "9p", "9p"],
        s: ["6s", "6s", "7s"],
        z: ["7z", "7z"],
    });
    const result = extract七対子(手牌Suit別);
    expect(result).matchSnapshot();
});
test("国士無双 - 一向聴", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "8m", "9m"],
        p: ["1p", "9p"],
        s: ["1s", "9s"],
        z: ["1z", "2z", "3z", "4z", "5z", "6z"],
    });
    const result = extract国士無双(手牌Suit別);
    expect(result).matchSnapshot();
});
test("国士無双 - 聴牌", () => {
    const 手牌Suit別 = generate手牌Suit別ForTest({
        m: ["1m", "9m", "9m"],
        p: ["1p", "9p"],
        s: ["1s", "9s"],
        z: ["1z", "2z", "3z", "4z", "5z", "6z"],
    });
    const result = extract国士無双(手牌Suit別);
    expect(result).matchSnapshot();
});
//# sourceMappingURL=extract%E7%89%B9%E6%AE%8A%E5%BD%B9.test.js.map