export class 副露 {
    宣言;
    鳴いた牌;
    ほかの牌;
    誰から;
    constructor({ 宣言, 鳴いた牌, ほかの牌, 誰から }) {
        this.宣言 = 宣言;
        this.鳴いた牌 = 鳴いた牌;
        this.ほかの牌 = ほかの牌;
        this.誰から = 誰から;
    }
    to牌List() {
        if (this.ほかの牌[2]) {
            return [this.鳴いた牌, this.ほかの牌[0], this.ほかの牌[1], this.ほかの牌[2]];
        }
        return [this.鳴いた牌, this.ほかの牌[0], this.ほかの牌[1]];
    }
}
//# sourceMappingURL=%E5%89%AF%E9%9C%B2.js.map