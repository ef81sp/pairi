"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.mts
var src_exports = {};
__export(src_exports, {
  \u526F\u9732: () => \u526F\u9732,
  \u624B\u724C: () => \u624B\u724C,
  \u724C: () => \u724C
});
module.exports = __toCommonJS(src_exports);

// src/副露.mts
var \u526F\u9732 = class {
  /** The declaration type of the 副露. */
  call;
  /** The tile that was melded. */
  called\u724C;
  /** The other tiles involved in the meld. */
  other\u724C;
  /** The player from whom the meld was declared. */
  from;
  /**
   * Creates a new instance of the 副露 class.
   * @param 宣言 The declaration type of the 副露.
   * @param 鳴いた牌 The tile that was melded.
   * @param ほかの牌 The other tiles involved in the meld.
   * @param 誰から The player from whom the meld was declared.
   */
  constructor({ call, called\u724C, other\u724C, from }) {
    this.call = call;
    this.called\u724C = called\u724C;
    this.other\u724C = other\u724C;
    this.from = from;
  }
  /**
   * Converts the 副露 to a list of tiles.
   * @returns An array of tiles involved in the meld.
   */
  to\u724CList() {
    if (this.other\u724C[2]) {
      return [this.called\u724C, this.other\u724C[0], this.other\u724C[1], this.other\u724C[2]];
    }
    return [this.called\u724C, this.other\u724C[0], this.other\u724C[1]];
  }
};

// src/手牌utils/countRequiredブロックnum.mts
var countRequired\u30D6\u30ED\u30C3\u30AFnum = (count\u724C2) => {
  switch (count\u724C2) {
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
      throw new Error(`invalid count\u724C: ${count\u724C2}`);
  }
};

// src/牌.mts
var \u724C = class _\u724C {
  suit;
  number;
  is\u8D64\u724C;
  str\u724C;
  /**
   * Constructs a new 牌 instance.
   * @param pai - The string representation of the 牌.
   * @param isRed - Indicates whether the 牌 is a red tile.
   */
  constructor(pai, isRed = false) {
    const { suit, number } = parsePaiString(pai);
    this.suit = suit;
    this.number = number;
    this.is\u8D64\u724C = (() => {
      if (suit === "z")
        return false;
      return number === 5 && isRed;
    })();
    this.str\u724C = pai;
  }
  /**
   * Returns the string representation of the 牌.
   * @returns The string representation of the 牌.
   */
  toString() {
    return this.str\u724C;
  }
  /**
   * Checks if the 牌 is equal to another 牌.
   * @param pai - The 牌 to compare.
   * @returns `true` if the 牌 is equal to the specified 牌, `false` otherwise.
   */
  toEqual(pai) {
    return this.str\u724C === pai.str\u724C;
  }
  /**
   * Creates a clone of the 牌.
   * @returns A new 牌 instance that is a clone of the current 牌.
   */
  clone() {
    return new _\u724C(this.str\u724C, this.is\u8D64\u724C);
  }
};
var parsePaiString = (pai) => {
  if (pai.length !== 2)
    throw new Error(`invalid signature ${pai}: length must be 2.`);
  const number = Number(pai[0]);
  const suit = pai[1];
  const numberErrorMessage = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`;
  const numberErrorMessage\u6570\u724C = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6, 7, 8 or 9.`;
  const numberErrorMessage\u5B57\u724C = `invalid signature ${pai}: number must be 1, 2, 3, 4, 5, 6 or 7.`;
  if (!Number.isInteger(number))
    throw new Error(numberErrorMessage);
  if (suit === void 0 || !["m", "p", "s", "z"].includes(suit))
    throw new Error(`invalid signature ${pai}: suit must be "m", "p", "s" or "z".`);
  if (["m", "p", "s"].includes(suit)) {
    if (!(1 <= number && number <= 9))
      throw new Error(numberErrorMessage\u6570\u724C);
    return {
      suit,
      number
    };
  }
  if (!(1 <= number && number <= 7))
    throw new Error(numberErrorMessage\u5B57\u724C);
  return {
    suit,
    number
  };
};
var isStr\u724C = (str) => {
  if (str.length !== 2)
    return false;
  const number = Number(str[0]);
  const suit = str[1];
  if (!Number.isInteger(number))
    return false;
  if (suit === void 0)
    return false;
  if (!["m", "p", "s", "z"].includes(suit))
    return false;
  if (["m", "p", "s"].includes(suit)) {
    if (!(1 <= number && number <= 9))
      return false;
  } else {
    if (!(1 <= number && number <= 7))
      return false;
  }
  return true;
};

// src/手牌utils/seek有効牌.mts
var seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF = (extractResult, \u30B7\u30E3\u30F3\u30C6\u30F3\u6570) => {
  if (\u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === 0)
    return seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF\u30C6\u30F3\u30D1\u30A4(extractResult);
  return seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF\u30CE\u30FC\u30C6\u30F3(extractResult);
};
var seek\u6709\u52B9\u724C\u4E03\u5BFE\u5B50 = (extractResult) => {
  const result = [];
  for (const rest of flattenRest(extractResult.rest)) {
    if (extractResult.\u5BFE\u5B50.some((\u5BFE\u5B50) => \u5BFE\u5B50.component.some((p) => p.toEqual(rest))))
      continue;
    result.push(rest.clone());
  }
  return result;
};
var seek\u6709\u52B9\u724C\u56FD\u58EB\u7121\u53CC = (extractResult) => {
  const target = ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"].map((s) => new \u724C(s));
  if (extractResult.\u4E48\u4E5D\u724Crest.length === 0)
    return target;
  return target.filter((p) => !extractResult.\u4E48\u4E5D\u724Cunique.some((p2) => p2.toEqual(p)));
};
var seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF\u30C6\u30F3\u30D1\u30A4 = (extractResult) => {
  if (extractResult.\u5854\u5B50.length >= 2) {
    throw new Error("\u5854\u5B50\u304C2\u500B\u4EE5\u4E0A\u3042\u308B\u5834\u5408\u306F\u8074\u724C\u3067\u306F\u306A\u3044");
  }
  if (extractResult.\u96C0\u982D) {
    if (extractResult.\u5854\u5B50[0] === void 0)
      throw new Error("\u96C0\u982D\u304C\u3042\u3063\u3066\u5854\u5B50\u304C\u306A\u3044\u5834\u5408\u306F\u30C6\u30F3\u30D1\u30A4\u3067\u306F\u306A\u3044");
    return seek\u5854\u5B50To\u9762\u5B50(extractResult.\u5854\u5B50[0]);
  }
  const rest = flattenRest(extractResult.rest)[0];
  if (rest === void 0)
    throw new Error(`invalid rest: ${extractResult.rest}`);
  const \u724Cstr = rest.toString();
  return [new \u724C(\u724Cstr)];
};
var seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF\u30CE\u30FC\u30C6\u30F3 = (extractResult) => {
  const result = [];
  const required\u9762\u5B50\u5854\u5B50num = countRequired\u30D6\u30ED\u30C3\u30AFnum(count\u724C(extractResult)) - 1;
  const \u9762\u5B50\u5854\u5B50\u6570 = extractResult.\u9762\u5B50.length + extractResult.\u5854\u5B50.length;
  for (const \u5854\u5B50 of extractResult.\u5854\u5B50) {
    result.push(...seek\u5854\u5B50To\u9762\u5B50(\u5854\u5B50));
  }
  if (\u9762\u5B50\u5854\u5B50\u6570 < required\u9762\u5B50\u5854\u5B50num) {
    for (const rest of flattenRest(extractResult.rest)) {
      result.push(...seekRestTo\u5854\u5B50(rest));
    }
    if (extractResult.\u96C0\u982D) {
      result.push(extractResult.\u96C0\u982D.component[0].clone());
    }
  }
  if (!extractResult.\u96C0\u982D) {
    if (\u9762\u5B50\u5854\u5B50\u6570 === required\u9762\u5B50\u5854\u5B50num) {
      result.push(...flattenRest(extractResult.rest));
    } else if (\u9762\u5B50\u5854\u5B50\u6570 > required\u9762\u5B50\u5854\u5B50num) {
      for (const \u5854\u5B50 of extractResult.\u5854\u5B50) {
        result.push(...\u5854\u5B50.component.map((p) => p.clone()));
      }
    }
  }
  const uniqueResult = result.filter((p, i) => {
    return result.findIndex((p2) => p2.toEqual(p)) === i;
  }).sort((a, b) => {
    if (a.suit === b.suit)
      return a.number - b.number;
    return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
  });
  return uniqueResult;
};
var flattenRest = (rest) => {
  return Object.values(rest).flat();
};
var seek\u5854\u5B50To\u9762\u5B50 = (\u5854\u5B50) => {
  const [\u724C1, \u724C2] = \u5854\u5B50.component;
  switch (true) {
    case \u724C1.number === \u724C2.number: {
      return [\u724C1.clone()];
    }
    case (\u724C1.number === 1 && \u724C2.number === 2): {
      return [new \u724C(`3${\u724C1.suit}`)];
    }
    case (\u724C1.number === 8 && \u724C2.number === 9): {
      return [new \u724C(`7${\u724C1.suit}`)];
    }
    case \u724C1.number === \u724C2.number - 2: {
      const \u724Cstr = `${\u724C1.number + 1}${\u724C1.suit}`;
      if (!isStr\u724C(\u724Cstr))
        throw new Error(`invalid \u724Cstr: ${\u724Cstr}`);
      return [new \u724C(\u724Cstr)];
    }
    case \u724C1.number === \u724C2.number - 1: {
      const \u724Cstr1 = `${\u724C1.number - 1}${\u724C1.suit}`;
      const \u724Cstr2 = `${\u724C2.number + 1}${\u724C2.suit}`;
      if (!isStr\u724C(\u724Cstr1))
        throw new Error(`invalid \u724Cstr: ${\u724Cstr1}`);
      if (!isStr\u724C(\u724Cstr2))
        throw new Error(`invalid \u724Cstr: ${\u724Cstr2}`);
      return [new \u724C(\u724Cstr1), new \u724C(\u724Cstr2)];
    }
    default: {
      throw new Error(
        `invalid \u5854\u5B50: ${\u5854\u5B50.component[0].toString()} ${\u5854\u5B50.component[1].toString()}`
      );
    }
  }
};
var seekRestTo\u5854\u5B50 = (\u6D6E\u304D\u724C) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  switch (\u6D6E\u304D\u724C.suit) {
    case "m":
    case "p":
    case "s": {
      const index = n.indexOf(\u6D6E\u304D\u724C.number);
      const min = Math.max(0, index - 2);
      const max = Math.min(8, index + 2);
      const targetNum = n.slice(min, max + 1);
      return targetNum.map((n2) => {
        const str = `${n2}${\u6D6E\u304D\u724C.suit}`;
        if (!isStr\u724C(str))
          throw new Error(`invalid str: ${str}`);
        return new \u724C(str);
      });
    }
    case "z": {
      return [\u6D6E\u304D\u724C.clone()];
    }
  }
};

// src/手牌utils/count牌.mts
var count\u724C = (extractResult5\u30D6\u30ED\u30C3\u30AF) => {
  let count = 0;
  if (extractResult5\u30D6\u30ED\u30C3\u30AF.\u96C0\u982D)
    count += 2;
  count += extractResult5\u30D6\u30ED\u30C3\u30AF.\u9762\u5B50.length * 3;
  count += extractResult5\u30D6\u30ED\u30C3\u30AF.\u5854\u5B50.length * 2;
  count += flattenRest(extractResult5\u30D6\u30ED\u30C3\u30AF.rest).length;
  return count;
};

// src/手牌utils/calcシャンテン数.mts
var calc\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF = (extractResult5\u30D6\u30ED\u30C3\u30AF) => {
  const required\u30D6\u30ED\u30C3\u30AFnum = countRequired\u30D6\u30ED\u30C3\u30AFnum(count\u724C(extractResult5\u30D6\u30ED\u30C3\u30AF));
  let \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 = 8;
  \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 -= (5 - required\u30D6\u30ED\u30C3\u30AFnum) * 2;
  \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 -= extractResult5\u30D6\u30ED\u30C3\u30AF.\u9762\u5B50.length * 2;
  \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 -= extractResult5\u30D6\u30ED\u30C3\u30AF.\u5854\u5B50.length;
  \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 -= extractResult5\u30D6\u30ED\u30C3\u30AF.\u96C0\u982D ? 1 : 0;
  if (extractResult5\u30D6\u30ED\u30C3\u30AF.\u9762\u5B50.length + extractResult5\u30D6\u30ED\u30C3\u30AF.\u5854\u5B50.length >= required\u30D6\u30ED\u30C3\u30AFnum) {
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 += 1;
  }
  return \u30B7\u30E3\u30F3\u30C6\u30F3\u6570;
};
var calc\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4E03\u5BFE\u5B50 = (extractResult\u4E03\u5BFE\u5B50) => {
  return 6 - extractResult\u4E03\u5BFE\u5B50.\u5BFE\u5B50.length;
};
var calc\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u56FD\u58EB\u7121\u53CC = (extractResult\u56FD\u58EB\u7121\u53CC) => {
  return extractResult\u56FD\u58EB\u7121\u53CC.\u4E48\u4E5D\u724Crest.length === 0 ? 13 - extractResult\u56FD\u58EB\u7121\u53CC.\u4E48\u4E5D\u724Cunique.length : 12 - extractResult\u56FD\u58EB\u7121\u53CC.\u4E48\u4E5D\u724Cunique.length;
};

// src/手牌utils/countRemaining牌.mts
var import_meta = {};
var countRemaining\u724Cnum = (target, visible\u724CList) => {
  const map = new Map(
    target.map((p) => [p.toString(), { \u724C: p, remains: 4 }])
  );
  for (const visible\u724C of visible\u724CList) {
    const p = map.get(visible\u724C.toString());
    if (p) {
      p.remains -= 1;
    }
  }
  return map;
};
if (import_meta.vitest) {
  test("\u5168\u67AF\u308C", () => {
    const result = countRemaining\u724Cnum(
      [new \u724C("1m")],
      [new \u724C("1m"), new \u724C("1m"), new \u724C("1m"), new \u724C("1m")]
    );
    expect(result.get("1m")).toEqual({ \u724C: new \u724C("1m"), remains: 0 });
  });
}

// src/手牌utils/extractSingleブロック.mts
var extractSingle\u30D6\u30ED\u30C3\u30AF = (\u624B\u724C2, type, startAt) => {
  validate\u624B\u724C(\u624B\u724C2);
  const { suit, index } = startAt;
  switch (type) {
    case "\u96C0\u982D": {
      const \u724C1 = \u624B\u724C2[suit][index];
      const \u724C2 = \u624B\u724C2[suit][index + 1];
      if (!(\u724C1 && \u724C2))
        return { status: "failure" };
      if (!is\u5BFE\u5B50(\u724C1, \u724C2))
        return { status: "failure" };
      const \u30D6\u30ED\u30C3\u30AF = {
        type: "\u96C0\u982D",
        component: [\u724C1, \u724C2]
      };
      const result = {
        status: "success",
        \u30D6\u30ED\u30C3\u30AF,
        rest: {
          ...\u624B\u724C2,
          [suit]: \u624B\u724C2[suit].filter((_, i) => i !== index && i !== index + 1)
        }
      };
      return result;
    }
    case "\u9762\u5B50": {
      const \u724C1 = \u624B\u724C2[suit][index];
      const \u724C2 = \u624B\u724C2[suit][index + 1];
      const \u724C3 = \u624B\u724C2[suit][index + 2];
      if (!(\u724C1 && \u724C2 && \u724C3))
        return { status: "failure" };
      if (is\u523B\u5B50(\u724C1, \u724C2, \u724C3)) {
        const \u30D6\u30ED\u30C3\u30AF = {
          type: "\u9762\u5B50",
          component: [\u724C1, \u724C2, \u724C3]
        };
        const result = {
          status: "success",
          \u30D6\u30ED\u30C3\u30AF,
          rest: {
            ...\u624B\u724C2,
            [suit]: \u624B\u724C2[suit].filter((_, i) => i !== index && i !== index + 1 && i !== index + 2)
          }
        };
        return result;
      }
      return find\u9806\u5B50(\u624B\u724C2, startAt);
    }
    case "\u5854\u5B50": {
      const \u724C1 = \u624B\u724C2[suit][index];
      const \u724C2 = \u624B\u724C2[suit][index + 1];
      if (!(\u724C1 && \u724C2))
        return { status: "failure" };
      if (is\u5BFE\u5B50(\u724C1, \u724C2)) {
        const \u30D6\u30ED\u30C3\u30AF = {
          type: "\u5854\u5B50",
          component: [\u724C1, \u724C2]
        };
        const result = {
          status: "success",
          \u30D6\u30ED\u30C3\u30AF,
          rest: {
            ...\u624B\u724C2,
            [suit]: \u624B\u724C2[suit].filter((_, i) => i !== index && i !== index + 1)
          }
        };
        return result;
      }
      return find\u9806\u5854\u5B50(\u624B\u724C2, startAt);
    }
    case "\u5BFE\u5B50": {
      const \u724C1 = \u624B\u724C2[suit][index];
      const \u724C2 = \u624B\u724C2[suit][index + 1];
      if (!(\u724C1 && \u724C2))
        return { status: "failure" };
      if (!is\u5BFE\u5B50(\u724C1, \u724C2))
        return { status: "failure" };
      const \u30D6\u30ED\u30C3\u30AF = {
        type: "\u5BFE\u5B50",
        component: [\u724C1, \u724C2]
      };
      const result = {
        status: "success",
        \u30D6\u30ED\u30C3\u30AF,
        rest: {
          ...\u624B\u724C2,
          [suit]: \u624B\u724C2[suit].filter((_, i) => i !== index && i !== index + 1)
        }
      };
      return result;
    }
    default:
      throw new Error(`invalid type: ${type}`);
  }
};
var validate\u624B\u724C = (\u624B\u724C2) => {
  if (!\u624B\u724C2.m.every((p) => p.suit === "m")) {
    throw new Error(`invalid type in "\u624B\u724C.m". received: ${\u624B\u724C2.m.map((p) => p.toString()).join()}`);
  }
  if (!\u624B\u724C2.p.every((p) => p.suit === "p")) {
    throw new Error(`invalid type in "\u624B\u724C.p". received: ${\u624B\u724C2.p.map((p) => p.toString()).join()}`);
  }
  if (!\u624B\u724C2.s.every((p) => p.suit === "s")) {
    throw new Error(`invalid type in "\u624B\u724C.s". received: ${\u624B\u724C2.s.map((p) => p.toString()).join()}`);
  }
  if (!\u624B\u724C2.z.every((p) => p.suit === "z")) {
    throw new Error(`invalid type in "\u624B\u724C.z". received: ${\u624B\u724C2.z.map((p) => p.toString()).join()}`);
  }
  if (!\u624B\u724C2.m.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "\u624B\u724C.m". received: ${\u624B\u724C2.m.map((p) => p.toString()).join()}`
    );
  }
  if (!\u624B\u724C2.p.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "\u624B\u724C.p". received: ${\u624B\u724C2.p.map((p) => p.toString()).join()}`
    );
  }
  if (!\u624B\u724C2.s.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "\u624B\u724C.s". received: ${\u624B\u724C2.s.map((p) => p.toString()).join()}`
    );
  }
  if (!\u624B\u724C2.z.every((p) => p.number >= 1 && p.number <= 7)) {
    throw new Error(
      `invalid number in "\u624B\u724C.z". received: ${\u624B\u724C2.z.map((p) => p.toString()).join()}`
    );
  }
};
var is\u5BFE\u5B50 = (\u724C1, \u724C2) => {
  return \u724C1.toEqual(\u724C2);
};
var is\u523B\u5B50 = (\u724C1, \u724C2, \u724C3) => {
  return \u724C1.suit === \u724C2.suit && \u724C2.suit === \u724C3.suit && \u724C1.number === \u724C2.number && \u724C2.number === \u724C3.number;
};
var find\u9806\u5B50 = (\u624B\u724C2, startAt) => {
  const \u624B\u724Csuit = \u624B\u724C2[startAt.suit];
  const start\u724C = \u624B\u724Csuit[startAt.index];
  if (start\u724C === void 0)
    return { status: "failure" };
  if (start\u724C.suit === "z")
    return { status: "failure" };
  if (start\u724C.number === 8 || start\u724C.number === 9)
    return { status: "failure" };
  const \u724C2str = `${start\u724C.number + 1}${start\u724C.suit}`;
  const \u724C3str = `${start\u724C.number + 2}${start\u724C.suit}`;
  if (!(isStr\u724C(\u724C2str) && isStr\u724C(\u724C3str)))
    return { status: "failure" };
  const \u9806\u5B50 = {
    type: "\u9762\u5B50",
    component: [start\u724C, new \u724C(\u724C2str), new \u724C(\u724C3str)]
  };
  const \u724C2index = \u624B\u724Csuit.findIndex((p) => p.toString() === \u724C2str);
  const \u724C3index = \u624B\u724Csuit.findIndex((p) => p.toString() === \u724C3str);
  if (\u724C2index === -1 || \u724C3index === -1)
    return { status: "failure" };
  return {
    status: "success",
    \u30D6\u30ED\u30C3\u30AF: \u9806\u5B50,
    rest: {
      ...\u624B\u724C2,
      [startAt.suit]: \u624B\u724Csuit.filter(
        (_, i) => i !== startAt.index && i !== \u724C2index && i !== \u724C3index
      )
    }
  };
};
var find\u9806\u5854\u5B50 = (\u624B\u724C2, startAt) => {
  const \u624B\u724Csuit = \u624B\u724C2[startAt.suit];
  const start\u724C = \u624B\u724Csuit[startAt.index];
  if (start\u724C === void 0)
    return { status: "failure" };
  if (start\u724C.suit === "z")
    return { status: "failure" };
  if (start\u724C.number === 9)
    return { status: "failure" };
  const \u724C2str = `${start\u724C.number + 1}${start\u724C.suit}`;
  if (!isStr\u724C(\u724C2str))
    return { status: "failure" };
  const \u724C2index = \u624B\u724Csuit.findIndex((p) => p.toString() === \u724C2str);
  if (\u724C2index >= 0) {
    const \u5854\u5B50 = {
      type: "\u5854\u5B50",
      component: [start\u724C, new \u724C(\u724C2str)]
    };
    return {
      status: "success",
      \u30D6\u30ED\u30C3\u30AF: \u5854\u5B50,
      rest: {
        ...\u624B\u724C2,
        [startAt.suit]: \u624B\u724Csuit.filter((_, i) => i !== startAt.index && i !== \u724C2index)
      }
    };
  }
  const \u724C3str = `${start\u724C.number + 2}${start\u724C.suit}`;
  if (!isStr\u724C(\u724C3str))
    return { status: "failure" };
  const \u724C3index = \u624B\u724Csuit.findIndex((p) => p.toString() === \u724C3str);
  if (\u724C3index >= 0) {
    const \u5854\u5B50 = {
      type: "\u5854\u5B50",
      component: [start\u724C, new \u724C(\u724C3str)]
    };
    return {
      status: "success",
      \u30D6\u30ED\u30C3\u30AF: \u5854\u5B50,
      rest: {
        ...\u624B\u724C2,
        [startAt.suit]: \u624B\u724Csuit.filter((_, i) => i !== startAt.index && i !== \u724C3index)
      }
    };
  }
  return { status: "failure" };
};

// src/手牌utils/extractブロックTree.mts
var extract\u9762\u5B50Tree = (\u624B\u724C2) => {
  const wholeResult = [];
  for (const suit of ["m", "p", "s", "z"]) {
    const \u624B\u724Csuit = \u624B\u724C2[suit];
    for (let i = 0; i < \u624B\u724Csuit.length; i++) {
      const result\u9762\u5B50 = extractSingle\u30D6\u30ED\u30C3\u30AF(\u624B\u724C2, "\u9762\u5B50", { suit, index: i });
      if (result\u9762\u5B50.status === "failure")
        continue;
      const children = extract\u9762\u5B50Tree(result\u9762\u5B50.rest);
      wholeResult.push({
        \u30D6\u30ED\u30C3\u30AF: result\u9762\u5B50.\u30D6\u30ED\u30C3\u30AF,
        rest: result\u9762\u5B50.rest,
        children
      });
    }
  }
  return wholeResult;
};
var extract\u5854\u5B50Tree = (\u624B\u724C2) => {
  const wholeResult = [];
  for (const suit of ["m", "p", "s", "z"]) {
    const \u624B\u724Csuit = \u624B\u724C2[suit];
    for (let i = 0; i < \u624B\u724Csuit.length; i++) {
      const result\u5854\u5B50 = extractSingle\u30D6\u30ED\u30C3\u30AF(\u624B\u724C2, "\u5854\u5B50", { suit, index: i });
      if (result\u5854\u5B50.status === "failure") {
        continue;
      }
      const children = extract\u5854\u5B50Tree(result\u5854\u5B50.rest);
      wholeResult.push({
        \u30D6\u30ED\u30C3\u30AF: result\u5854\u5B50.\u30D6\u30ED\u30C3\u30AF,
        rest: result\u5854\u5B50.rest,
        children
      });
    }
  }
  if (wholeResult.length === 0) {
    return [
      {
        \u30D6\u30ED\u30C3\u30AF: null,
        rest: \u624B\u724C2,
        children: []
      }
    ];
  }
  return wholeResult;
};
var extract\u5BFE\u5B50Tree = (\u624B\u724C2) => {
  const wholeResult = [];
  for (const suit of ["m", "p", "s", "z"]) {
    const \u624B\u724Csuit = \u624B\u724C2[suit];
    for (let i = 0; i < \u624B\u724Csuit.length; i++) {
      const result\u5BFE\u5B50 = extractSingle\u30D6\u30ED\u30C3\u30AF(\u624B\u724C2, "\u5BFE\u5B50", { suit, index: i });
      if (result\u5BFE\u5B50.status === "failure") {
        continue;
      }
      const children = extract\u5BFE\u5B50Tree(result\u5BFE\u5B50.rest);
      wholeResult.push({
        \u30D6\u30ED\u30C3\u30AF: result\u5BFE\u5B50.\u30D6\u30ED\u30C3\u30AF,
        rest: result\u5BFE\u5B50.rest,
        children
      });
    }
  }
  if (wholeResult.length === 0) {
    return [
      {
        \u30D6\u30ED\u30C3\u30AF: null,
        rest: \u624B\u724C2,
        children: []
      }
    ];
  }
  return wholeResult;
};
var flatTree = (tree) => {
  if (tree.children.length === 0) {
    return [
      {
        \u30D6\u30ED\u30C3\u30AF: tree.\u30D6\u30ED\u30C3\u30AF ? [tree.\u30D6\u30ED\u30C3\u30AF] : [],
        rest: tree.rest
      }
    ];
  }
  const flatChildren = tree.children.flatMap(flatTree);
  const result = flatChildren.map((c) => ({
    \u30D6\u30ED\u30C3\u30AF: (tree.\u30D6\u30ED\u30C3\u30AF ? [tree.\u30D6\u30ED\u30C3\u30AF, ...c.\u30D6\u30ED\u30C3\u30AF] : [...c.\u30D6\u30ED\u30C3\u30AF]).sort((a, b) => {
      if (a == null)
        return 1;
      if (b == null)
        return -1;
      if (a.type === b.type) {
        if (a.component[0].suit === b.component[0].suit) {
          return a.component[0].number - b.component[0].number;
        }
        return a.component[0].suit.charCodeAt(0) - b.component[0].suit.charCodeAt(0);
      }
      if (a.type === "\u96C0\u982D")
        return -1;
      if (b.type === "\u96C0\u982D")
        return 1;
      if (a.type === "\u9762\u5B50")
        return -1;
      if (b.type === "\u9762\u5B50")
        return 1;
      if (a.type === "\u5854\u5B50")
        return -1;
      if (b.type === "\u5854\u5B50")
        return 1;
      return 0;
    }),
    rest: c.rest
  }));
  return result;
};
var flatTrees = (trees) => {
  return trees.flatMap(flatTree).filter((r, i, arr) => {
    const rStr = JSON.stringify(r);
    return arr.findIndex((r2) => JSON.stringify(r2) === rStr) === i;
  });
};

// src/手牌utils/extractPriority雀頭.mts
var import_meta2 = {};
var extractPriority\u96C0\u982D = (\u624B\u724C2) => {
  const results = [];
  const \u96C0\u982DList = extract\u96C0\u982D(\u624B\u724C2);
  for (const \u96C0\u982D of \u96C0\u982DList) {
    const \u9762\u5B50List = flatTrees(extract\u9762\u5B50Tree(\u96C0\u982D.rest));
    if (\u9762\u5B50List.length > 0) {
      for (const \u9762\u5B50 of \u9762\u5B50List) {
        const \u5854\u5B50List = flatTrees(extract\u5854\u5B50Tree(\u9762\u5B50.rest));
        for (const \u5854\u5B50 of \u5854\u5B50List) {
          results.push({
            \u96C0\u982D: \u96C0\u982D.\u30D6\u30ED\u30C3\u30AF,
            \u9762\u5B50: \u9762\u5B50.\u30D6\u30ED\u30C3\u30AF,
            \u5854\u5B50: \u5854\u5B50.\u30D6\u30ED\u30C3\u30AF,
            rest: \u5854\u5B50.rest
          });
        }
      }
    } else {
      const \u5854\u5B50List = flatTrees(extract\u5854\u5B50Tree(\u96C0\u982D.rest));
      for (const \u5854\u5B50 of \u5854\u5B50List) {
        results.push({
          \u96C0\u982D: \u96C0\u982D.\u30D6\u30ED\u30C3\u30AF,
          \u9762\u5B50: [],
          \u5854\u5B50: \u5854\u5B50.\u30D6\u30ED\u30C3\u30AF,
          rest: \u5854\u5B50.rest
        });
      }
    }
  }
  const \u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult = results.map((r) => [
    calc\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF(r),
    r
  ]);
  const min = Math.min(...\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult.map(([s]) => s));
  const filteredResults = \u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult.filter(([\u30B7\u30E3\u30F3\u30C6\u30F3\u6570]) => \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === min).map(([, r]) => r);
  return filteredResults;
};
var extract\u96C0\u982D = (\u624B\u724C2) => {
  const wholeResult = [];
  for (const suit of ["m", "p", "s", "z"]) {
    const \u624B\u724Csuit = \u624B\u724C2[suit];
    for (let i = 0; i < \u624B\u724Csuit.length; i++) {
      wholeResult.push(extractSingle\u30D6\u30ED\u30C3\u30AF(\u624B\u724C2, "\u96C0\u982D", { suit, index: i }));
    }
  }
  const successResult = wholeResult.filter(
    (r) => r.status === "success"
  );
  const uniqueResult = successResult.filter((r, i) => {
    const rStr = JSON.stringify(r);
    return successResult.findIndex((r2) => JSON.stringify(r2) === rStr) === i;
  });
  return uniqueResult;
};
if (import_meta2.vitest) {
  test("\u96C0\u982D\u62BD\u51FA", () => {
    const result = extract\u96C0\u982D({
      m: ["1m", "1m", "1m", "2m", "3m"].map((s) => new \u724C(s)),
      p: ["4p", "5p", "6p", "6p", "9p"].map((s) => new \u724C(s)),
      s: ["3s"].map((s) => new \u724C(s)),
      z: ["1z", "1z"].map((s) => new \u724C(s))
    });
    expect(result).toMatchSnapshot();
  });
}

// src/手牌utils/extractPriority面子.mts
var extractPriority\u9762\u5B50 = (\u624B\u724C2) => {
  const results = [];
  const \u9762\u5B50List = flatTrees(extract\u9762\u5B50Tree(\u624B\u724C2));
  if (\u9762\u5B50List.length > 0) {
    for (const \u9762\u5B50 of \u9762\u5B50List) {
      const \u5854\u5B50List = flatTrees(extract\u5854\u5B50Tree(\u9762\u5B50.rest));
      for (const \u5854\u5B50 of \u5854\u5B50List) {
        results.push({
          \u96C0\u982D: null,
          \u9762\u5B50: \u9762\u5B50.\u30D6\u30ED\u30C3\u30AF,
          \u5854\u5B50: \u5854\u5B50.\u30D6\u30ED\u30C3\u30AF,
          rest: \u5854\u5B50.rest
        });
      }
    }
  } else {
    const \u5854\u5B50List = flatTrees(extract\u5854\u5B50Tree(\u624B\u724C2));
    for (const \u5854\u5B50 of \u5854\u5B50List) {
      results.push({
        \u96C0\u982D: null,
        \u9762\u5B50: [],
        \u5854\u5B50: \u5854\u5B50.\u30D6\u30ED\u30C3\u30AF,
        rest: \u5854\u5B50.rest
      });
    }
  }
  const filteredResults = results.filter((r) => !r.\u5854\u5B50.some((t) => is\u5BFE\u5B502(...t.component)));
  const \u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult = filteredResults.map((r) => [
    calc\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF(r),
    r
  ]);
  const min = Math.min(...\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult.map(([s]) => s));
  const filteredResults2 = \u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4ED8\u304Dresult.filter(([\u30B7\u30E3\u30F3\u30C6\u30F3\u6570]) => \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === min).map(([, r]) => r);
  return filteredResults2;
};
var is\u5BFE\u5B502 = (\u724C1, \u724C2) => {
  return \u724C1.toEqual(\u724C2);
};

// src/手牌utils/extract特殊役.mts
var extract\u4E03\u5BFE\u5B50 = (\u624B\u724C2) => {
  const \u4E03\u5BFE\u5B50 = flatTrees(extract\u5BFE\u5B50Tree(\u624B\u724C2))[0];
  if (\u4E03\u5BFE\u5B50 === void 0) {
    return {
      \u5BFE\u5B50: [],
      rest: \u624B\u724C2
    };
  }
  return {
    \u5BFE\u5B50: \u4E03\u5BFE\u5B50.\u30D6\u30ED\u30C3\u30AF,
    rest: \u4E03\u5BFE\u5B50.rest
  };
};
var extract\u56FD\u58EB\u7121\u53CC = (\u624B\u724C2) => {
  const \u4E48\u4E5D\u724Cunique = [];
  const \u4E48\u4E5D\u724Crest = [];
  const rest = {
    m: [],
    p: [],
    s: [],
    z: []
  };
  for (const suit of ["m", "p", "s"]) {
    for (const \u724C2 of \u624B\u724C2[suit]) {
      if (\u724C2.number === 1 || \u724C2.number === 9) {
        if (!\u4E48\u4E5D\u724Cunique.find((p) => p.toString() === \u724C2.toString())) {
          \u4E48\u4E5D\u724Cunique.push(\u724C2);
        } else {
          \u4E48\u4E5D\u724Crest.push(\u724C2);
        }
      } else {
        rest[suit].push(\u724C2);
      }
    }
  }
  for (const \u724C2 of \u624B\u724C2.z) {
    if (!\u4E48\u4E5D\u724Cunique.find((p) => p.toString() === \u724C2.toString())) {
      \u4E48\u4E5D\u724Cunique.push(\u724C2);
    } else {
      \u4E48\u4E5D\u724Crest.push(\u724C2);
    }
  }
  return {
    \u4E48\u4E5D\u724Cunique,
    \u4E48\u4E5D\u724Crest,
    rest
  };
};

// src/手牌utils/format牌List.mts
var sort\u724CList = (target) => {
  return target.sort((a, b) => {
    if (a.suit === b.suit)
      return a.number - b.number;
    return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
  });
};
var unique\u724CList = (target) => {
  return sort\u724CList(target).filter((p, i, arr) => {
    if (i === 0)
      return true;
    const prev = arr[i - 1];
    if (prev === void 0)
      throw new Error("arr[i-1] is undefined");
    return !p.toEqual(prev);
  });
};

// src/手牌utils/analyze手牌.mts
var analyze\u624B\u724C13Memo = /* @__PURE__ */ new Map();
var addToMap = (key, value) => {
  analyze\u624B\u724C13Memo.set(key, value);
  if (analyze\u624B\u724C13Memo.size > 3) {
    const keys = Array.from(analyze\u624B\u724C13Memo.keys());
    if (keys[0]) {
      analyze\u624B\u724C13Memo.delete(keys[0]);
    }
  }
};
var analyze13 = (\u624B\u724CSuit\u5225, used\u724C) => {
  const analysisResult = analyze\u624B\u724C13(\u624B\u724CSuit\u5225);
  const \u30B7\u30E3\u30F3\u30C6\u30F3\u6570 = Math.min(
    analysisResult._5\u30D6\u30ED\u30C3\u30AF.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570,
    analysisResult.\u4E03\u5BFE\u5B50.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570,
    analysisResult.\u56FD\u58EB\u7121\u53CC.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570
  );
  const \u6709\u52B9\u724Ctarget = [];
  if (\u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === analysisResult._5\u30D6\u30ED\u30C3\u30AF.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570) {
    \u6709\u52B9\u724Ctarget.push(...analysisResult._5\u30D6\u30ED\u30C3\u30AF.\u6709\u52B9\u724C);
  }
  if (\u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === analysisResult.\u4E03\u5BFE\u5B50.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570) {
    \u6709\u52B9\u724Ctarget.push(...analysisResult.\u4E03\u5BFE\u5B50.\u6709\u52B9\u724C);
  }
  if (\u30B7\u30E3\u30F3\u30C6\u30F3\u6570 === analysisResult.\u56FD\u58EB\u7121\u53CC.\u30B7\u30E3\u30F3\u30C6\u30F3\u6570) {
    \u6709\u52B9\u724Ctarget.push(...analysisResult.\u56FD\u58EB\u7121\u53CC.\u6709\u52B9\u724C);
  }
  const \u6709\u52B9\u724C = unique\u724CList(\u6709\u52B9\u724Ctarget);
  const remaining\u6709\u52B9\u724Cnum = countRemaining\u724Cnum(\u6709\u52B9\u724C, used\u724C);
  return {
    analysisResult,
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570,
    \u6709\u52B9\u724C,
    remaining\u6709\u52B9\u724Cnum
  };
};
var analyze\u624B\u724C13 = (\u624B\u724CSuit\u5225) => {
  const key = \u624B\u724CSuit\u5225.m.map((p) => p.toString()).join("") + \u624B\u724CSuit\u5225.p.map((p) => p.toString()).join("") + \u624B\u724CSuit\u5225.s.map((p) => p.toString()).join("") + \u624B\u724CSuit\u5225.z.map((p) => p.toString()).join("");
  const memo = analyze\u624B\u724C13Memo.get(key);
  if (memo) {
    return memo;
  }
  const result = {
    _5\u30D6\u30ED\u30C3\u30AF: analyze\u624B\u724C5\u30D6\u30ED\u30C3\u30AF(\u624B\u724CSuit\u5225),
    \u4E03\u5BFE\u5B50: analyze\u624B\u724C\u4E03\u5BFE\u5B50(\u624B\u724CSuit\u5225),
    \u56FD\u58EB\u7121\u53CC: analyze\u624B\u724C\u56FD\u58EB\u7121\u53CC(\u624B\u724CSuit\u5225)
  };
  addToMap(key, result);
  return result;
};
var analyze\u624B\u724C5\u30D6\u30ED\u30C3\u30AF = (\u624B\u724CSuit\u5225) => {
  const priority\u96C0\u982D = extractPriority\u96C0\u982D(\u624B\u724CSuit\u5225);
  const priority\u9762\u5B50 = extractPriority\u9762\u5B50(\u624B\u724CSuit\u5225);
  const _\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF = priority\u96C0\u982D.length + priority\u9762\u5B50.length === 0 ? 8 : Math.min(...[...priority\u96C0\u982D, ...priority\u9762\u5B50].map((r) => calc\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF(r)));
  const _5\u30D6\u30ED\u30C3\u30AF = [...priority\u96C0\u982D, ...priority\u9762\u5B50].filter(
    (r) => calc\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF(r) === _\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF
  );
  const indivisuals5\u30D6\u30ED\u30C3\u30AF = _5\u30D6\u30ED\u30C3\u30AF.map((b) => ({
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570: _\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF,
    \u30D6\u30ED\u30C3\u30AF: b,
    \u6709\u52B9\u724C: seek\u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF(b, _\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF)
  }));
  const \u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF = indivisuals5\u30D6\u30ED\u30C3\u30AF.flatMap((r) => r.\u6709\u52B9\u724C).filter((p, i, arr) => {
    return arr.findIndex((p2) => p2.suit === p.suit && p2.number === p.number) === i;
  }).sort((a, b) => {
    if (a.suit === b.suit)
      return a.number - b.number;
    return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
  });
  return {
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570: _\u30B7\u30E3\u30F3\u30C6\u30F3\u65705\u30D6\u30ED\u30C3\u30AF,
    \u6709\u52B9\u724C: \u6709\u52B9\u724C5\u30D6\u30ED\u30C3\u30AF,
    indivisuals: indivisuals5\u30D6\u30ED\u30C3\u30AF
  };
};
var analyze\u624B\u724C\u4E03\u5BFE\u5B50 = (\u624B\u724CSuit\u5225) => {
  const \u4E03\u5BFE\u5B50 = extract\u4E03\u5BFE\u5B50(\u624B\u724CSuit\u5225);
  const _\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4E03\u5BFE\u5B50 = calc\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4E03\u5BFE\u5B50(\u4E03\u5BFE\u5B50);
  const \u6709\u52B9\u724C\u4E03\u5BFE\u5B50 = seek\u6709\u52B9\u724C\u4E03\u5BFE\u5B50(\u4E03\u5BFE\u5B50);
  return {
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570: _\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u4E03\u5BFE\u5B50,
    \u6709\u52B9\u724C: \u6709\u52B9\u724C\u4E03\u5BFE\u5B50
  };
};
var analyze\u624B\u724C\u56FD\u58EB\u7121\u53CC = (\u624B\u724CSuit\u5225) => {
  const \u56FD\u58EB\u7121\u53CC = extract\u56FD\u58EB\u7121\u53CC(\u624B\u724CSuit\u5225);
  const _\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u56FD\u58EB\u7121\u53CC = calc\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u56FD\u58EB\u7121\u53CC(\u56FD\u58EB\u7121\u53CC);
  const \u6709\u52B9\u724C\u56FD\u58EB\u7121\u53CC = seek\u6709\u52B9\u724C\u56FD\u58EB\u7121\u53CC(\u56FD\u58EB\u7121\u53CC);
  return {
    \u30B7\u30E3\u30F3\u30C6\u30F3\u6570: _\u30B7\u30E3\u30F3\u30C6\u30F3\u6570\u56FD\u58EB\u7121\u53CC,
    \u6709\u52B9\u724C: \u6709\u52B9\u724C\u56FD\u58EB\u7121\u53CC
  };
};

// src/手牌.mts
var \u624B\u724C = class {
  \u666E\u901A;
  \u526F\u9732 = [];
  \u30C4\u30E2 = null;
  analysisResult13 = null;
  analysisResult14 = null;
  /**
   * Creates a new 手牌 instance.
   * @param 普通 The normal 牌s in the hand.
   * @param 副露 The melded 牌s in the hand.
   */
  constructor(\u666E\u901A, \u526F\u97322) {
    this.\u666E\u901A = \u666E\u901A;
    if (\u526F\u97322) {
      this.\u526F\u9732 = \u526F\u97322;
    }
    this.sort();
    this.analyze13();
  }
  /**
   * Sorts the normal 牌s in the hand.
   */
  sort() {
    this.\u666E\u901A.sort((a, b) => {
      if (a.suit === b.suit)
        return a.number - b.number;
      return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
    });
  }
  /**
   * Returns the 手牌's マンズ 牌s.
   * @returns The マンズ 牌s in the hand.
   */
  \u30DE\u30F3\u30BA() {
    return this.\u666E\u901A.filter((p) => p.suit === "m");
  }
  /**
   * Returns the 手牌's ピンズ 牌s.
   * @returns The ピンズ 牌s in the hand.
   */
  \u30D4\u30F3\u30BA() {
    return this.\u666E\u901A.filter((p) => p.suit === "p");
  }
  /**
   * Returns the 手牌's ソーズ 牌s.
   * @returns The ソーズ 牌s in the hand.
   */
  \u30BD\u30FC\u30BA() {
    return this.\u666E\u901A.filter((p) => p.suit === "s");
  }
  /**
   * Returns the 手牌's 字牌 牌s.
   * @returns The 字牌 牌s in the hand.
   */
  \u5B57\u724C() {
    return this.\u666E\u901A.filter((p) => p.suit === "z");
  }
  /**
   * Returns a string representation of the normal 牌s in the hand.
   * @returns A string representation of the normal 牌s.
   */
  toString\u666E\u901A() {
    return this.\u666E\u901A.map((p) => p.toString()).join("");
  }
  /**
   * Sets the ツモ 牌 in the hand and performs analysis for 14-牌 hand.
   * @param ツモ The ツモ 牌.
   */
  do\u30C4\u30E2(\u30C4\u30E2) {
    this.\u30C4\u30E2 = \u30C4\u30E2;
    this.analyze14();
  }
  /**
   * Adds an melded set of 牌s to the hand and performs analysis for 14-牌 hand.
   * @param 副露 The melded set of 牌s.
   */
  do\u526F\u9732(\u526F\u97322) {
    if (this.\u526F\u9732.length === 4)
      throw new Error("\u526F\u9732\u3067\u304D\u308B\u306E\u306F4\u56DE\u307E\u3067");
    for (const p of \u526F\u97322.other\u724C) {
      if (p === void 0)
        throw new Error("\u526F\u9732\u306E\u307B\u304B\u306E\u724C\u306B undefined \u304C\u542B\u307E\u308C\u3066\u3044\u308B");
      if (!this.\u666E\u901A.some((p2) => p2.toEqual(p))) {
        throw new Error(`\u624B\u724C\u306B ${p} \u304C\u306A\u3044\u306E\u306B\u526F\u9732\u3057\u3088\u3046\u3068\u3057\u305F`);
      }
    }
    this.\u526F\u9732 = [...this.\u526F\u9732, \u526F\u97322];
    for (const p of \u526F\u97322.other\u724C) {
      if (p === void 0)
        throw new Error("\u526F\u9732\u306E\u307B\u304B\u306E\u724C\u306B undefined \u304C\u542B\u307E\u308C\u3066\u3044\u308B");
      const index = this.\u666E\u901A.findIndex((p2) => p2.toEqual(p));
      this.\u666E\u901A.splice(index, 1);
    }
    this.analyze14({ is\u526F\u9732\u5F8C: true });
  }
  /**
   * Performs the specified 打牌 action in the hand.
   * @param 打牌 The 打牌 action to perform.
   */
  do\u6253\u724C(\u6253\u724C) {
    switch (\u6253\u724C.type) {
      case "\u30C4\u30E2\u5207\u308A": {
        if (this.\u30C4\u30E2 === null)
          throw new Error("\u30C4\u30E2\u3057\u3066\u3044\u306A\u3044\u306E\u306B\u6253\u724C\u3057\u3088\u3046\u3068\u3057\u305F");
        this.\u30C4\u30E2 = null;
        break;
      }
      case "\u30C4\u30E2\u5F8C\u624B\u51FA\u3057": {
        if (this.\u30C4\u30E2 === null)
          throw new Error("\u30C4\u30E2\u3057\u3066\u3044\u306A\u3044\u306E\u306B\u6253\u724C\u3057\u3088\u3046\u3068\u3057\u305F");
        const index = this.\u666E\u901A.findIndex((p) => p.toEqual(\u6253\u724C.\u724C));
        if (index === -1)
          throw new Error(`\u624B\u724C\u306B ${\u6253\u724C.\u724C} \u304C\u306A\u3044\u306E\u306B\u6253\u724C\u3057\u3088\u3046\u3068\u3057\u305F`);
        this.\u666E\u901A.splice(index, 1, this.\u30C4\u30E2);
        this.\u30C4\u30E2 = null;
        this.sort();
        break;
      }
      case "\u526F\u9732\u5F8C\u624B\u51FA\u3057": {
        const index = this.\u666E\u901A.findIndex((p) => p.toEqual(\u6253\u724C.\u724C));
        if (index === -1)
          throw new Error(`\u624B\u724C\u306B ${\u6253\u724C.\u724C} \u304C\u306A\u3044\u306E\u306B\u6253\u724C\u3057\u3088\u3046\u3068\u3057\u305F`);
        this.\u666E\u901A.splice(index, 1);
        this.\u30C4\u30E2 = null;
        this.sort();
        break;
      }
      default: {
        throw new Error(`invalid \u6253\u724C.type: ${\u6253\u724C}`);
      }
    }
    this.analyze13();
  }
  /**
   * Returns the analysis result for 13-牌 hand.
   * @returns The analysis result for 13-牌 hand.
   */
  getAnalysisResult13() {
    return this.analysisResult13;
  }
  /**
   * Returns the analysis result for 14-牌 hand.
   * @returns The analysis result for 14-牌 hand.
   */
  getAnalysisResult14() {
    return this.analysisResult14;
  }
  /**
   * Returns a list of all 牌s in the hand, including normal and melded 牌s.
   * @returns A list of all 牌s in the hand.
   */
  \u724CList() {
    const _\u724CList = [...this.\u666E\u901A, ...this.\u526F\u9732.flatMap((f) => f.to\u724CList())];
    if (this.\u30C4\u30E2)
      _\u724CList.push(this.\u30C4\u30E2);
    return sort\u724CList(_\u724CList);
  }
  /**
   * Returns a list of all 牌s in the hand, excluding the ツモ 牌.
   * @returns A list of all 牌s in the hand, excluding the ツモ 牌.
   */
  \u724CListExcludes\u30C4\u30E2() {
    const _\u724CList = [...this.\u666E\u901A, ...this.\u526F\u9732.flatMap((f) => f.to\u724CList())];
    return sort\u724CList(_\u724CList);
  }
  /**
   * Performs analysis for 13-牌 hand.
   * @returns The analysis result for 13-牌 hand.
   */
  analyze13() {
    const analysisResult = analyze13(
      {
        m: this.\u30DE\u30F3\u30BA(),
        p: this.\u30D4\u30F3\u30BA(),
        s: this.\u30BD\u30FC\u30BA(),
        z: this.\u5B57\u724C()
      },
      this.\u724CList()
    );
    this.analysisResult14 = null;
    this.analysisResult13 = analysisResult;
    return this.analysisResult13;
  }
  /**
   * Performs analysis for 14-牌 hand.
   * @param is副露後 Indicates whether the analysis is performed after an melded set of 牌s is added.
   * @returns The analysis result for 14-牌 hand.
   */
  analyze14({ is\u526F\u9732\u5F8C } = { is\u526F\u9732\u5F8C: false }) {
    const hand = (() => {
      if (is\u526F\u9732\u5F8C)
        return this.\u666E\u901A;
      if (this.\u30C4\u30E2 === null)
        throw new Error("\u30C4\u30E2\u3057\u3066\u3044\u306A\u3044\u306E\u306B analyze14 \u3057\u3088\u3046\u3068\u3057\u305F");
      return sort\u724CList([...this.\u666E\u901A, this.\u30C4\u30E2]);
    })();
    const \u6253\u724CcandidateList = unique\u724CList(hand);
    const result = /* @__PURE__ */ new Map();
    for (const \u724C2 of \u6253\u724CcandidateList) {
      const i = hand.findIndex((p) => p.toEqual(\u724C2));
      result.set(\u724C2.toString(), {
        \u6253\u724C: \u724C2,
        analysisResult: analyze13(\u724CListToSuit\u5225(hand.toSpliced(i, 1)), this.\u724CList())
      });
    }
    this.analysisResult13 = null;
    this.analysisResult14 = result;
    return this.analysisResult14;
  }
};
var \u724CListToSuit\u5225 = (\u724CList) => {
  const \u624B\u724CSuit\u5225 = {
    m: [],
    p: [],
    s: [],
    z: []
  };
  for (const \u724C2 of \u724CList) {
    \u624B\u724CSuit\u5225[\u724C2.suit].push(\u724C2);
  }
  return \u624B\u724CSuit\u5225;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  \u526F\u9732,
  \u624B\u724C,
  \u724C
});
//# sourceMappingURL=index.cjs.map