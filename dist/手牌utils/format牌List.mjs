export const sort牌List = (target) => {
    return target.sort((a, b) => {
        if (a.suit === b.suit)
            return a.number - b.number;
        return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
    });
};
export const unique牌List = (target) => {
    return sort牌List(target).filter((p, i, arr) => {
        if (i === 0)
            return true;
        const prev = arr[i - 1];
        if (prev === undefined)
            throw new Error("arr[i-1] is undefined");
        return !p.toEqual(prev);
    });
};
//# sourceMappingURL=format%E7%89%8CList.mjs.map