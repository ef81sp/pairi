import { 牌 } from "../牌";
export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
export const generate手牌Suit別ForTest = ({ m, p, s, z, }) => ({
    m: m.map((s) => new 牌(s)),
    p: p.map((s) => new 牌(s)),
    s: s.map((s) => new 牌(s)),
    z: z.map((s) => new 牌(s)),
});
//# sourceMappingURL=utils.js.map