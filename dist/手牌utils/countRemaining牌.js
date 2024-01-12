export const countRemaining牌num = (target, visible牌List) => {
    const map = new Map(target.map((p) => [p.toString(), { 牌: p, remains: 4 }]));
    for (const visible牌 of visible牌List) {
        const p = map.get(visible牌.toString());
        if (p) {
            p.remains -= 1;
        }
    }
    return map;
};
//# sourceMappingURL=countRemaining%E7%89%8C.js.map