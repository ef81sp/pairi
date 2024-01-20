import { IntermediateExtractResult, IntermediateExtractTree, TブロックType, T手牌Suit別 } from "./手牌utils.type.mjs";
export declare const extract面子Tree: (手牌: T手牌Suit別) => IntermediateExtractTree<"面子">[];
export declare const extract塔子Tree: (手牌: T手牌Suit別) => IntermediateExtractTree<"塔子">[];
export declare const extract対子Tree: (手牌: T手牌Suit別) => IntermediateExtractTree<"対子">[];
export declare const flatTree: <T extends TブロックType>(tree: IntermediateExtractTree<T>) => IntermediateExtractResult<T>[];
export declare const flatTrees: <T extends TブロックType>(trees: IntermediateExtractTree<T>[]) => IntermediateExtractResult<T>[];
//# sourceMappingURL=extract%E3%83%96%E3%83%AD%E3%83%83%E3%82%AFTree.d.mts.map