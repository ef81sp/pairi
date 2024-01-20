import { 牌 } from "./牌.mjs";
type T宣言 = "ポン" | "チー" | "大明槓" | "加槓" | "暗槓";
type T誰から = "上家" | "対面" | "下家";
type 副露InputDataポンチー = {
    call: "ポン" | "チー";
    called牌: 牌;
    other牌: [牌, 牌];
    from: T誰から;
};
type 副露InputDataカン = {
    call: "大明槓" | "加槓" | "暗槓";
    called牌: 牌;
    other牌: [牌, 牌, 牌];
    from: T誰から;
};
export declare class 副露 {
    readonly call: T宣言;
    readonly called牌: 牌;
    readonly other牌: [牌, 牌, 牌?];
    readonly from: T誰から;
    constructor({ call, called牌, other牌, from }: 副露InputDataポンチー | 副露InputDataカン);
    to牌List(): 牌[];
}
export {};
//# sourceMappingURL=%E5%89%AF%E9%9C%B2.d.mts.map