import { Suit } from "../utils/types.mjs";
import { 牌 } from "../牌.mjs";
export type Result単体抽出<T extends TブロックType> = Result単体抽出Success<T> | Result単体抽出Failure;
export type Result単体抽出Success<T extends TブロックType> = {
    status: "success";
    ブロック: Tブロック<T>;
    rest: T手牌Suit別;
};
export type Result単体抽出Failure = {
    status: "failure";
};
export type T手牌Suit別 = {
    [key in Suit]: 牌[];
};
export type ExtractResult5ブロック = {
    雀頭: T雀頭 | null;
    面子: T面子[];
    塔子: T塔子[];
    rest: T手牌Suit別;
};
export type ExtractResult七対子 = {
    対子: T対子[];
    rest: T手牌Suit別;
};
export type ExtractResult国士無双 = {
    么九牌unique: 牌[];
    么九牌rest: 牌[];
    rest: T手牌Suit別;
};
export type IntermediateExtractResult<T extends TブロックType> = {
    ブロック: Tブロック<T>[];
    rest: T手牌Suit別;
};
export type IntermediateExtractTree<T extends TブロックType> = {
    ブロック: Tブロック<T> | null;
    rest: T手牌Suit別;
    children: IntermediateExtractTree<T>[];
};
export type Tブロック<T> = T extends "雀頭" ? T雀頭 : T extends "面子" ? T面子 : T extends "塔子" ? T塔子 : T extends "対子" ? T対子 : never;
export type TブロックType = "雀頭" | "面子" | "塔子" | "対子";
export type T雀頭 = {
    type: "雀頭";
    component: [牌, 牌];
};
export type T面子 = {
    type: "面子";
    component: [牌, 牌, 牌];
};
export type T塔子 = {
    type: "塔子";
    component: [牌, 牌];
};
export type T対子 = {
    type: "対子";
    component: [牌, 牌];
};
//# sourceMappingURL=%E6%89%8B%E7%89%8Cutils.type.d.mts.map