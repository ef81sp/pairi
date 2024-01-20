import { Suit } from "../utils/types.mjs";
import { Result単体抽出, TブロックType, T手牌Suit別 } from "./手牌utils.type.mjs";
export declare const extractSingleブロック: <T extends TブロックType>(手牌: T手牌Suit別, type: T, startAt: {
    suit: Suit;
    index: number;
}) => Result単体抽出<T>;
//# sourceMappingURL=extractSingle%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF.d.mts.map