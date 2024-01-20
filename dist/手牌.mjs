import { analyze13 } from "./手牌utils/analyze手牌.mjs";
import { sort牌List, unique牌List } from "./手牌utils/format牌List.mjs";
export class 手牌 {
    普通;
    副露 = [];
    ツモ = null;
    analysisResult13 = null;
    analysisResult14 = null;
    constructor(普通, 副露) {
        this.普通 = 普通;
        if (副露) {
            this.副露 = 副露;
        }
        this.sort();
        this.analyze13();
    }
    sort() {
        this.普通.sort((a, b) => {
            if (a.suit === b.suit)
                return a.number - b.number;
            return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
        });
    }
    マンズ() {
        return this.普通.filter((p) => p.suit === "m");
    }
    ピンズ() {
        return this.普通.filter((p) => p.suit === "p");
    }
    ソーズ() {
        return this.普通.filter((p) => p.suit === "s");
    }
    字牌() {
        return this.普通.filter((p) => p.suit === "z");
    }
    toString普通() {
        return this.普通.map((p) => p.toString()).join("");
    }
    doツモ(ツモ) {
        this.ツモ = ツモ;
        this.analyze14();
    }
    do副露(副露) {
        if (this.副露.length === 4)
            throw new Error("副露できるのは4回まで");
        for (const p of 副露.other牌) {
            if (p === undefined)
                throw new Error("副露のほかの牌に undefined が含まれている");
            if (!this.普通.some((p2) => p2.toEqual(p))) {
                throw new Error(`手牌に ${p} がないのに副露しようとした`);
            }
        }
        this.副露 = [...this.副露, 副露];
        for (const p of 副露.other牌) {
            if (p === undefined)
                throw new Error("副露のほかの牌に undefined が含まれている");
            const index = this.普通.findIndex((p2) => p2.toEqual(p));
            this.普通.splice(index, 1);
        }
        this.analyze14({ is副露後: true });
    }
    do打牌(打牌) {
        switch (打牌.type) {
            case "ツモ切り": {
                if (this.ツモ === null)
                    throw new Error("ツモしていないのに打牌しようとした");
                this.ツモ = null;
                break;
            }
            case "ツモ後手出し": {
                if (this.ツモ === null)
                    throw new Error("ツモしていないのに打牌しようとした");
                const index = this.普通.findIndex((p) => p.toEqual(打牌.牌));
                if (index === -1)
                    throw new Error(`手牌に ${打牌.牌} がないのに打牌しようとした`);
                this.普通.splice(index, 1, this.ツモ);
                this.ツモ = null;
                this.sort();
                break;
            }
            case "副露後手出し": {
                const index = this.普通.findIndex((p) => p.toEqual(打牌.牌));
                if (index === -1)
                    throw new Error(`手牌に ${打牌.牌} がないのに打牌しようとした`);
                this.普通.splice(index, 1);
                this.ツモ = null;
                this.sort();
                break;
            }
            default: {
                throw new Error(`invalid 打牌.type: ${打牌}`);
            }
        }
        this.analyze13();
    }
    getAnalysisResult13() {
        return this.analysisResult13;
    }
    getAnalysisResult14() {
        return this.analysisResult14;
    }
    牌List() {
        const _牌List = [...this.普通, ...this.副露.flatMap((f) => f.to牌List())];
        if (this.ツモ)
            _牌List.push(this.ツモ);
        return sort牌List(_牌List);
    }
    牌ListExcludesツモ() {
        const _牌List = [...this.普通, ...this.副露.flatMap((f) => f.to牌List())];
        return sort牌List(_牌List);
    }
    analyze13() {
        const analysisResult = analyze13({
            m: this.マンズ(),
            p: this.ピンズ(),
            s: this.ソーズ(),
            z: this.字牌(),
        }, this.牌List());
        this.analysisResult14 = null;
        this.analysisResult13 = analysisResult;
        return this.analysisResult13;
    }
    analyze14({ is副露後 } = { is副露後: false }) {
        const hand = (() => {
            if (is副露後)
                return this.普通;
            if (this.ツモ === null)
                throw new Error("ツモしていないのに analyze14 しようとした");
            return sort牌List([...this.普通, this.ツモ]);
        })();
        const 打牌candidateList = unique牌List(hand);
        const result = new Map();
        for (const 牌 of 打牌candidateList) {
            const i = hand.findIndex((p) => p.toEqual(牌));
            result.set(牌.toString(), {
                打牌: 牌,
                analysisResult: analyze13(牌ListToSuit別(hand.toSpliced(i, 1)), this.牌List()),
            });
        }
        this.analysisResult13 = null;
        this.analysisResult14 = result;
        return this.analysisResult14;
    }
}
const 牌ListToSuit別 = (牌List) => {
    const 手牌Suit別 = {
        m: [],
        p: [],
        s: [],
        z: [],
    };
    for (const 牌 of 牌List) {
        手牌Suit別[牌.suit].push(牌);
    }
    return 手牌Suit別;
};
//# sourceMappingURL=%E6%89%8B%E7%89%8C.mjs.map