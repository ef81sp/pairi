import { Number字牌, Number数牌, Str牌, Suit, Suit字牌 } from "./utils/types";
export declare class 牌 {
    readonly suit: Suit;
    readonly number: typeof this.suit extends Suit字牌 ? Number字牌 : Number数牌;
    readonly is赤牌: boolean;
    private readonly str牌;
    constructor(pai: Str牌, isRed?: boolean);
    toString(): Str牌;
    toEqual(pai: 牌): boolean;
    clone(): 牌;
}
export declare const isStr牌: (str: string) => str is Str牌;
//# sourceMappingURL=%E7%89%8C.d.ts.map