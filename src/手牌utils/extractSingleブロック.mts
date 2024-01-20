import { Suit } from "../utils/types.mjs"
import { isStr牌, 牌 } from "../牌.mjs"
import {
  Result単体抽出,
  Result単体抽出Success,
  Tブロック,
  TブロックType,
  T塔子,
  T対子,
  T手牌Suit別,
  T雀頭,
  T面子,
} from "./手牌utils.type.mjs"

// 用語: 順塔子とは、 両面・辺張・嵌張 のこと。一般名称がないので……

// TS、返り値の型の絞り込みは未実装らしい。asで型アサーションするしかない。

export const extractSingleブロック = <T extends TブロックType>(
  手牌: T手牌Suit別,
  type: T,
  startAt: { suit: Suit; index: number },
): Result単体抽出<T> => {
  validate手牌(手牌)

  const { suit, index } = startAt
  switch (type) {
    case "雀頭": {
      const 牌1 = 手牌[suit][index]
      const 牌2 = 手牌[suit][index + 1]
      if (!(牌1 && 牌2)) return { status: "failure" }
      if (!is対子(牌1, 牌2)) return { status: "failure" }
      const ブロック: T雀頭 = {
        type: "雀頭",
        component: [牌1, 牌2],
      }
      const result: Result単体抽出<"雀頭"> = {
        status: "success",
        ブロック,
        rest: {
          ...手牌,
          [suit]: 手牌[suit].filter((_, i) => i !== index && i !== index + 1),
        },
      }
      return result satisfies Result単体抽出Success<"雀頭"> as Result単体抽出<T>
    }
    case "面子": {
      // 刻子 → 順子
      const 牌1 = 手牌[suit][index]
      const 牌2 = 手牌[suit][index + 1]
      const 牌3 = 手牌[suit][index + 2]
      if (!(牌1 && 牌2 && 牌3)) return { status: "failure" }
      if (is刻子(牌1, 牌2, 牌3)) {
        const ブロック: T面子 = {
          type: "面子",
          component: [牌1, 牌2, 牌3],
        }
        const result: Result単体抽出<"面子"> = {
          status: "success",
          ブロック,
          rest: {
            ...手牌,
            [suit]: 手牌[suit].filter((_, i) => i !== index && i !== index + 1 && i !== index + 2),
          },
        }
        return result satisfies Result単体抽出Success<"面子"> as Result単体抽出<T>
      }
      return find順子(手牌, startAt) as Result単体抽出<T>
    }
    case "塔子": {
      // 対子 → 順塔子
      const 牌1 = 手牌[suit][index]
      const 牌2 = 手牌[suit][index + 1]
      if (!(牌1 && 牌2)) return { status: "failure" }
      if (is対子(牌1, 牌2)) {
        const ブロック: T塔子 = {
          type: "塔子",
          component: [牌1, 牌2],
        }
        const result: Result単体抽出<"塔子"> = {
          status: "success",
          ブロック,
          rest: {
            ...手牌,
            [suit]: 手牌[suit].filter((_, i) => i !== index && i !== index + 1),
          },
        }
        return result satisfies Result単体抽出Success<"塔子"> as Result単体抽出<T>
      }
      return find順塔子(手牌, startAt) as Result単体抽出<T>
    }
    case "対子": {
      // 雀頭と同じだが七対子用として分ける
      const 牌1 = 手牌[suit][index]
      const 牌2 = 手牌[suit][index + 1]
      if (!(牌1 && 牌2)) return { status: "failure" }
      if (!is対子(牌1, 牌2)) return { status: "failure" }
      const ブロック: T対子 = {
        type: "対子",
        component: [牌1, 牌2],
      }
      const result: Result単体抽出<"対子"> = {
        status: "success",
        ブロック,
        rest: {
          ...手牌,
          [suit]: 手牌[suit].filter((_, i) => i !== index && i !== index + 1),
        },
      }
      return result satisfies Result単体抽出Success<"対子"> as Result単体抽出<T>
    }
    default:
      throw new Error(`invalid type: ${type}`)
  }
}

const validate手牌 = (手牌: T手牌Suit別): void => {
  if (!手牌.m.every((p) => p.suit === "m")) {
    throw new Error(`invalid type in "手牌.m". received: ${手牌.m.map((p) => p.toString()).join()}`)
  }
  if (!手牌.p.every((p) => p.suit === "p")) {
    throw new Error(`invalid type in "手牌.p". received: ${手牌.p.map((p) => p.toString()).join()}`)
  }
  if (!手牌.s.every((p) => p.suit === "s")) {
    throw new Error(`invalid type in "手牌.s". received: ${手牌.s.map((p) => p.toString()).join()}`)
  }
  if (!手牌.z.every((p) => p.suit === "z")) {
    throw new Error(`invalid type in "手牌.z". received: ${手牌.z.map((p) => p.toString()).join()}`)
  }
  if (!手牌.m.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "手牌.m". received: ${手牌.m.map((p) => p.toString()).join()}`,
    )
  }
  if (!手牌.p.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "手牌.p". received: ${手牌.p.map((p) => p.toString()).join()}`,
    )
  }
  if (!手牌.s.every((p) => p.number >= 1 && p.number <= 9)) {
    throw new Error(
      `invalid number in "手牌.s". received: ${手牌.s.map((p) => p.toString()).join()}`,
    )
  }
  if (!手牌.z.every((p) => p.number >= 1 && p.number <= 7)) {
    throw new Error(
      `invalid number in "手牌.z". received: ${手牌.z.map((p) => p.toString()).join()}`,
    )
  }
}

const is対子 = (牌1: 牌, 牌2: 牌): boolean => {
  return 牌1.toEqual(牌2)
}

const is刻子 = (牌1: 牌, 牌2: 牌, 牌3: 牌): boolean => {
  return (
    牌1.suit === 牌2.suit &&
    牌2.suit === 牌3.suit &&
    牌1.number === 牌2.number &&
    牌2.number === 牌3.number
  )
}

const is順塔子 = (牌1: 牌, 牌2: 牌): boolean => {
  return 牌1.suit === 牌2.suit && 牌1.number + 1 === 牌2.number
}

const find順子 = (
  手牌: T手牌Suit別,
  startAt: { suit: Suit; index: number },
): Result単体抽出<"面子"> => {
  const 手牌suit = 手牌[startAt.suit]
  const start牌 = 手牌suit[startAt.index]

  if (start牌 === undefined) return { status: "failure" }
  if (start牌.suit === "z") return { status: "failure" }

  // 8や9から順子は作れない
  if (start牌.number === 8 || start牌.number === 9) return { status: "failure" }

  const 牌2str = `${start牌.number + 1}${start牌.suit}`
  const 牌3str = `${start牌.number + 2}${start牌.suit}`

  if (!(isStr牌(牌2str) && isStr牌(牌3str))) return { status: "failure" }

  const 順子: T面子 = {
    type: "面子",
    component: [start牌, new 牌(牌2str), new 牌(牌3str)],
  }

  const 牌2index = 手牌suit.findIndex((p) => p.toString() === 牌2str)
  const 牌3index = 手牌suit.findIndex((p) => p.toString() === 牌3str)

  if (牌2index === -1 || 牌3index === -1) return { status: "failure" }
  return {
    status: "success",
    ブロック: 順子,
    rest: {
      ...手牌,
      [startAt.suit]: 手牌suit.filter(
        (_, i) => i !== startAt.index && i !== 牌2index && i !== 牌3index,
      ),
    },
  }
}

const find順塔子 = (
  手牌: T手牌Suit別,
  startAt: { suit: Suit; index: number },
): Result単体抽出<"塔子"> => {
  const 手牌suit = 手牌[startAt.suit]
  const start牌 = 手牌suit[startAt.index]

  if (start牌 === undefined) return { status: "failure" }
  if (start牌.suit === "z") return { status: "failure" }

  // 9から順塔子は作れない
  if (start牌.number === 9) return { status: "failure" }

  // 両面・辺張(連続)を試行
  const 牌2str = `${start牌.number + 1}${start牌.suit}`
  if (!isStr牌(牌2str)) return { status: "failure" }

  const 牌2index = 手牌suit.findIndex((p) => p.toString() === 牌2str)
  if (牌2index >= 0) {
    const 塔子: T塔子 = {
      type: "塔子",
      component: [start牌, new 牌(牌2str)],
    }
    return {
      status: "success",
      ブロック: 塔子,
      rest: {
        ...手牌,
        [startAt.suit]: 手牌suit.filter((_, i) => i !== startAt.index && i !== 牌2index),
      },
    }
  }

  // 嵌張(1個とばし)を試行
  const 牌3str = `${start牌.number + 2}${start牌.suit}`
  if (!isStr牌(牌3str)) return { status: "failure" }

  const 牌3index = 手牌suit.findIndex((p) => p.toString() === 牌3str)
  if (牌3index >= 0) {
    const 塔子: T塔子 = {
      type: "塔子",
      component: [start牌, new 牌(牌3str)],
    }
    return {
      status: "success",
      ブロック: 塔子,
      rest: {
        ...手牌,
        [startAt.suit]: 手牌suit.filter((_, i) => i !== startAt.index && i !== 牌3index),
      },
    }
  }
  return { status: "failure" }
}
