import { Str牌 } from "../utils/types.mjs";
import { 牌 } from "../牌.mjs";
import { ExtractResult5ブロック, T手牌Suit別 } from "./手牌utils.type.mjs";
type AnalysisResult13Common = {
    シャンテン数: number;
    有効牌: 牌[];
};
type AnalysisResult5ブロックIndivisual = {
    シャンテン数: number;
    ブロック: ExtractResult5ブロック;
    有効牌: 牌[];
};
export type AnalysisResult手牌13 = {
    _5ブロック: AnalysisResult13Common & {
        indivisuals: AnalysisResult5ブロックIndivisual[];
    };
    七対子: AnalysisResult13Common;
    国士無双: AnalysisResult13Common;
};
export type AnalysisResult13 = {
    analysisResult: AnalysisResult手牌13;
    シャンテン数: number;
    有効牌: 牌[];
    remaining有効牌num: Map<Str牌, {
        牌: 牌;
        remains: number;
    }>;
};
export declare const analyze13: (手牌Suit別: T手牌Suit別, used牌: 牌[]) => AnalysisResult13;
export {};
//# sourceMappingURL=analyze%E6%89%8B%E7%89%8C.d.mts.map