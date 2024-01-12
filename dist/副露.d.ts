import { 牌 } from "./牌";
type T宣言 = "ポン" | "チー" | "大明槓" | "加槓" | "暗槓";
type T誰から = "上家" | "対面" | "下家";
type 副露InputDataポンチー = {
    宣言: "ポン" | "チー";
    鳴いた牌: 牌;
    ほかの牌: [牌, 牌];
    誰から: T誰から;
};
type 副露InputDataカン = {
    宣言: "大明槓" | "加槓" | "暗槓";
    鳴いた牌: 牌;
    ほかの牌: [牌, 牌, 牌];
    誰から: T誰から;
};
export declare class 副露 {
    readonly 宣言: T宣言;
    readonly 鳴いた牌: 牌;
    readonly ほかの牌: [牌, 牌, 牌?];
    readonly 誰から: T誰から;
    constructor({ 宣言, 鳴いた牌, ほかの牌, 誰から }: 副露InputDataポンチー | 副露InputDataカン);
    to牌List(): 牌[];
}
export {};
//# sourceMappingURL=%E5%89%AF%E9%9C%B2.d.ts.map