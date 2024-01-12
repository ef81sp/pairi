import { countRequiredブロックnum } from "./countRequiredブロックnum";
import { count牌 } from "./count牌";
export const calcシャンテン数5ブロック = (extractResult5ブロック) => {
    const requiredブロックnum = countRequiredブロックnum(count牌(extractResult5ブロック));
    let シャンテン数 = 8;
    シャンテン数 -= (5 - requiredブロックnum) * 2;
    シャンテン数 -= extractResult5ブロック.面子.length * 2;
    シャンテン数 -= extractResult5ブロック.塔子.length;
    シャンテン数 -= extractResult5ブロック.雀頭 ? 1 : 0;
    if (extractResult5ブロック.面子.length + extractResult5ブロック.塔子.length >=
        requiredブロックnum) {
        シャンテン数 += 1;
    }
    return シャンテン数;
};
export const calcシャンテン数七対子 = (extractResult七対子) => {
    return 6 - extractResult七対子.対子.length;
};
export const calcシャンテン数国士無双 = (extractResult国士無双) => {
    return extractResult国士無双.么九牌rest.length === 0
        ? 13 - extractResult国士無双.么九牌unique.length
        : 12 - extractResult国士無双.么九牌unique.length;
};
//# sourceMappingURL=calc%E3%82%B7%E3%83%A3%E3%83%B3%E3%83%86%E3%83%B3%E6%95%B0.js.map