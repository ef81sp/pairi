export class 副露 {
    call;
    called牌;
    other牌;
    from;
    constructor({ call, called牌, other牌, from }) {
        this.call = call;
        this.called牌 = called牌;
        this.other牌 = other牌;
        this.from = from;
    }
    to牌List() {
        if (this.other牌[2]) {
            return [this.called牌, this.other牌[0], this.other牌[1], this.other牌[2]];
        }
        return [this.called牌, this.other牌[0], this.other牌[1]];
    }
}
//# sourceMappingURL=%E5%89%AF%E9%9C%B2.js.map