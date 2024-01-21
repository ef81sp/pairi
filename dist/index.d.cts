type Suit数牌 = "m" | "p" | "s";
type Suit字牌 = "z";
type Suit = Suit数牌 | Suit字牌;
type Number数牌 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Number字牌 = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Str数牌 = `${Number数牌}${Suit数牌}`;
type Str字牌 = `${Number字牌}${Suit字牌}`;
type Str牌 = Str数牌 | Str字牌;

declare class 牌 {
    readonly suit: Suit;
    readonly number: typeof this.suit extends Suit字牌 ? Number字牌 : Number数牌;
    readonly is赤牌: boolean;
    private readonly str牌;
    constructor(pai: Str牌, isRed?: boolean);
    toString(): Str牌;
    toEqual(pai: 牌): boolean;
    clone(): 牌;
}

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
declare class 副露 {
    readonly call: T宣言;
    readonly called牌: 牌;
    readonly other牌: [牌, 牌, 牌?];
    readonly from: T誰から;
    constructor({ call, called牌, other牌, from }: 副露InputDataポンチー | 副露InputDataカン);
    to牌List(): 牌[];
}

type T手牌Suit別 = {
    [key in Suit]: 牌[];
};
type ExtractResult5ブロック = {
    雀頭: T雀頭 | null;
    面子: T面子[];
    塔子: T塔子[];
    rest: T手牌Suit別;
};
type T雀頭 = {
    type: "雀頭";
    component: [牌, 牌];
};
type T面子 = {
    type: "面子";
    component: [牌, 牌, 牌];
};
type T塔子 = {
    type: "塔子";
    component: [牌, 牌];
};

type AnalysisResult13Common = {
    シャンテン数: number;
    有効牌: 牌[];
};
type AnalysisResult5ブロックIndivisual = {
    シャンテン数: number;
    ブロック: ExtractResult5ブロック;
    有効牌: 牌[];
};
type AnalysisResult手牌13 = {
    _5ブロック: AnalysisResult13Common & {
        indivisuals: AnalysisResult5ブロックIndivisual[];
    };
    七対子: AnalysisResult13Common;
    国士無双: AnalysisResult13Common;
};
type AnalysisResult13 = {
    analysisResult: AnalysisResult手牌13;
    シャンテン数: number;
    有効牌: 牌[];
    remaining有効牌num: Map<Str牌, {
        牌: 牌;
        remains: number;
    }>;
};

type T手牌普通 = [牌] | [牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌] | [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌];
type T手牌副露 = [] | [副露] | [副露, 副露] | [副露, 副露, 副露] | [副露, 副露, 副露, 副露];
type analysisResult14 = Map<Str牌, {
    打牌: 牌;
    analysisResult: AnalysisResult13;
}>;
declare class 手牌 {
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
    牌ListExcludesツモ(): 牌[];
    protected analyze13(): AnalysisResult13;
    protected analyze14({ is副露後 }?: {
        is副露後: boolean;
    }): analysisResult14;
}

export { 副露, 手牌, 牌 };
