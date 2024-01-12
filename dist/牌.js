export class 牌 {
    suit;
    number;
    is赤牌;
    str牌;
    constructor(pai, isRed = false) {
        const { suit, number } = parsePaiString(pai);
        this.suit = suit;
        this.number = number;
        this.is赤牌 = (() => {
            if (suit === "z")
                return false;
            return number === 5 && isRed;
        })();
        this.str牌 = pai;
    }
    toString() {
        return this.str牌;
    }
    toEqual(pai) {
        return this.str牌 === pai.str牌;
    }
    clone() {
        return new 牌(this.str牌, this.is赤牌);
    }
}
const parsePaiString = (pai) => {
    if (pai.length !== 2)
        throw new Error(`invalid signature ${pai}: length must be 2.`);
    const number = Number(pai[0]);
    const suit = pai[1];
    const numberErrorMessage = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`;
    const numberErrorMessage数牌 = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`;
    const numberErrorMessage字牌 = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6 or 7.`;
    if (!Number.isInteger(number))
        throw new Error(numberErrorMessage);
    if (suit === undefined || !["m", "p", "s", "z"].includes(suit))
        throw new Error(`invalid signature ${pai}: suit must be "m", "p", "s" or "z".`);
    if (["m", "p", "s"].includes(suit)) {
        if (!(1 <= number && number <= 9))
            throw new Error(numberErrorMessage数牌);
        return {
            suit,
            number,
        };
    }
    if (!(1 <= number && number <= 7))
        throw new Error(numberErrorMessage字牌);
    return {
        suit,
        number,
    };
};
export const isStr牌 = (str) => {
    if (str.length !== 2)
        return false;
    const number = Number(str[0]);
    const suit = str[1];
    if (!Number.isInteger(number))
        return false;
    if (suit === undefined)
        return false;
    if (!["m", "p", "s", "z"].includes(suit))
        return false;
    if (["m", "p", "s"].includes(suit)) {
        if (!(1 <= number && number <= 9))
            return false;
    }
    else {
        if (!(1 <= number && number <= 7))
            return false;
    }
    return true;
};
//# sourceMappingURL=%E7%89%8C.js.map