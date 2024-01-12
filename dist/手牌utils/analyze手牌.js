import { calcシャンテン数5ブロック, calcシャンテン数七対子, calcシャンテン数国士無双, } from "./calcシャンテン数";
import { countRemaining牌num } from "./countRemaining牌";
import { extractPriority雀頭 } from "./extractPriority雀頭";
import { extractPriority面子 } from "./extractPriority面子";
import { extract七対子, extract国士無双 } from "./extract特殊役";
import { unique牌List } from "./format牌List";
import { seek有効牌5ブロック, seek有効牌七対子, seek有効牌国士無双 } from "./seek有効牌";
const analyze手牌13Memo = new Map();
const addToMap = (key, value) => {
    analyze手牌13Memo.set(key, value);
    if (analyze手牌13Memo.size > 3) {
        const keys = Array.from(analyze手牌13Memo.keys());
        if (keys[0]) {
            analyze手牌13Memo.delete(keys[0]);
        }
    }
};
export const analyze13 = (手牌Suit別, used牌) => {
    const analysisResult = analyze手牌13(手牌Suit別);
    const シャンテン数 = Math.min(analysisResult._5ブロック.シャンテン数, analysisResult.七対子.シャンテン数, analysisResult.国士無双.シャンテン数);
    const 有効牌target = [];
    if (シャンテン数 === analysisResult._5ブロック.シャンテン数) {
        有効牌target.push(...analysisResult._5ブロック.有効牌);
    }
    if (シャンテン数 === analysisResult.七対子.シャンテン数) {
        有効牌target.push(...analysisResult.七対子.有効牌);
    }
    if (シャンテン数 === analysisResult.国士無双.シャンテン数) {
        有効牌target.push(...analysisResult.国士無双.有効牌);
    }
    const 有効牌 = unique牌List(有効牌target);
    const remaining有効牌num = countRemaining牌num(有効牌, used牌);
    return {
        analysisResult,
        シャンテン数,
        有効牌,
        remaining有効牌num,
    };
};
const analyze手牌13 = (手牌Suit別) => {
    const key = 手牌Suit別.m.map((p) => p.toString()).join("") +
        手牌Suit別.p.map((p) => p.toString()).join("") +
        手牌Suit別.s.map((p) => p.toString()).join("") +
        手牌Suit別.z.map((p) => p.toString()).join("");
    const memo = analyze手牌13Memo.get(key);
    if (memo) {
        return memo;
    }
    const result = {
        _5ブロック: analyze手牌5ブロック(手牌Suit別),
        七対子: analyze手牌七対子(手牌Suit別),
        国士無双: analyze手牌国士無双(手牌Suit別),
    };
    addToMap(key, result);
    return result;
};
const analyze手牌5ブロック = (手牌Suit別) => {
    const priority雀頭 = extractPriority雀頭(手牌Suit別);
    const priority面子 = extractPriority面子(手牌Suit別);
    const _シャンテン数5ブロック = priority雀頭.length + priority面子.length === 0
        ? 8
        : Math.min(...[...priority雀頭, ...priority面子].map((r) => calcシャンテン数5ブロック(r)));
    const _5ブロック = [...priority雀頭, ...priority面子].filter((r) => calcシャンテン数5ブロック(r) === _シャンテン数5ブロック);
    const indivisuals5ブロック = _5ブロック.map((b) => ({
        シャンテン数: _シャンテン数5ブロック,
        ブロック: b,
        有効牌: seek有効牌5ブロック(b, _シャンテン数5ブロック),
    }));
    const 有効牌5ブロック = indivisuals5ブロック
        .flatMap((r) => r.有効牌)
        .filter((p, i, arr) => {
        return arr.findIndex((p2) => p2.suit === p.suit && p2.number === p.number) === i;
    })
        .sort((a, b) => {
        if (a.suit === b.suit)
            return a.number - b.number;
        return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
    });
    return {
        シャンテン数: _シャンテン数5ブロック,
        有効牌: 有効牌5ブロック,
        indivisuals: indivisuals5ブロック,
    };
};
const analyze手牌七対子 = (手牌Suit別) => {
    const 七対子 = extract七対子(手牌Suit別);
    const _シャンテン数七対子 = calcシャンテン数七対子(七対子);
    const 有効牌七対子 = seek有効牌七対子(七対子);
    return {
        シャンテン数: _シャンテン数七対子,
        有効牌: 有効牌七対子,
    };
};
const analyze手牌国士無双 = (手牌Suit別) => {
    const 国士無双 = extract国士無双(手牌Suit別);
    const _シャンテン数国士無双 = calcシャンテン数国士無双(国士無双);
    const 有効牌国士無双 = seek有効牌国士無双(国士無双);
    return {
        シャンテン数: _シャンテン数国士無双,
        有効牌: 有効牌国士無双,
    };
};
//# sourceMappingURL=analyze%E6%89%8B%E7%89%8C.js.map