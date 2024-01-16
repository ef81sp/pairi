import { Str牌 } from "./utils/types";
import { 副露 } from "./副露";
import { AnalysisResult13 } from "./手牌utils/analyze手牌";
import { 牌 } from "./牌";
export type T手牌普通 = [牌] | [牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌];
type T手牌副露 = [] | [副露] | [副露, 副露] | [副露, 副露, 副露] | [副露, 副露, 副露, 副露];
type analysisResult14 = Map<Str牌, {
    打牌: 牌;
    analysisResult: AnalysisResult13;
}>;
export declare class 手牌 {
    普通: T手牌普通;
    副露: T手牌副露;
    ツモ: 牌 | null;
    protected analysisResult13: AnalysisResult13 | null;
    protected analysisResult14: analysisResult14 | null;
    constructor(普通: T手牌普通, 副露?: T手牌副露);
    protected sort(): void;
    protected マンズ(): 牌[];
    protected ピンズ(): 牌[];
    protected ソーズ(): 牌[];
    protected 字牌(): 牌[];
    toString普通(): string;
    doツモ(ツモ: 牌): void;
    do副露(副露: 副露): void;
    do打牌(打牌: {
        type: "ツモ切り";
    } | {
        type: "ツモ後手出し";
        牌: 牌;
    } | {
        type: "副露後手出し";
        牌: 牌;
    }): void;
    getAnalysisResult13(): AnalysisResult13 | null;
    getAnalysisResult14(): analysisResult14 | null;
    牌List(): 牌[];
    protected analyze13(): AnalysisResult13;
    protected analyze14({ is副露後 }?: {
        is副露後: boolean;
    }): analysisResult14;
}
export {};
//# sourceMappingURL=%E6%89%8B%E7%89%8C.d.ts.map