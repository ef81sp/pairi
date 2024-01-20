export const countRequiredブロックnum = (count牌) => {
    switch (count牌) {
        case 1:
            return 1;
        case 4:
            return 2;
        case 7:
            return 3;
        case 10:
            return 4;
        case 13:
            return 5;
        default:
            throw new Error(`invalid count牌: ${count牌}`);
    }
};
//# sourceMappingURL=countRequired%E3%83%96%E3%83%AD%E3%83%83%E3%82%AFnum.mjs.map