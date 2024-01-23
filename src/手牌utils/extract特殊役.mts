import { generate手牌Suit別ForTest } from "../utils/utils.mjs"
import { extract対子Tree, flatTrees } from "./extractブロックTree.mjs"
import {
  ExtractResult5ブロック,
  ExtractResult七対子,
  ExtractResult国士無双,
  T手牌Suit別,
} from "./手牌utils.type.mjs"

export const extract七対子 = (手牌: T手牌Suit別): ExtractResult七対子 => {
  const 七対子 = flatTrees(extract対子Tree(手牌))[0]
  if (七対子 === undefined) {
    return {
      対子: [],
      rest: 手牌,
    }
  }
  // ブロック内にまったく同一の対子がある場合は、片方をrestに書き戻す
  // 七対子.ブロックから重複している対子のインデックスを探す。ひとつだけでよい
  // あれば、その対子をrestに書き戻す
  const duplicatedIndex = 七対子.ブロック.findIndex((対子, index, array) => {
    return array.findIndex((対子2) => {
      return 対子.component[0].toString() === 対子2.component[0].toString()
    }) !== index
  })
  if (duplicatedIndex !== -1) {
    const duplicated対子 = 七対子.ブロック[duplicatedIndex]
    if (duplicated対子 === undefined) throw new Error("duplicated対子 is undefined")
    七対子.ブロック.splice(duplicatedIndex, 1)
    七対子.rest[duplicated対子.component[0].suit].push(duplicated対子.component[0])
    七対子.rest[duplicated対子.component[1].suit].push(duplicated対子.component[1])
  }
 

  return {
    対子: 七対子.ブロック,
    rest: 七対子.rest,
  }
}

export const extract国士無双 = (手牌: T手牌Suit別): ExtractResult国士無双 => {
  const 么九牌unique: ExtractResult国士無双["么九牌unique"] = []
  const 么九牌rest: ExtractResult国士無双["么九牌rest"] = []
  const rest: ExtractResult国士無双["rest"] = {
    m: [],
    p: [],
    s: [],
    z: [],
  }
  // m,p,sから1,9の牌を1枚ずつだけ抽出する
  for (const suit of ["m", "p", "s"] as const) {
    for (const 牌 of 手牌[suit]) {
      if (牌.number === 1 || 牌.number === 9) {
        if (!么九牌unique.find((p) => p.toString() === 牌.toString())) {
          么九牌unique.push(牌)
        } else {
          么九牌rest.push(牌)
        }
      } else {
        rest[suit].push(牌)
      }
    }
  }
  // zはすべての種類を1枚ずつだけ抽出する
  for (const 牌 of 手牌.z) {
    if (!么九牌unique.find((p) => p.toString() === 牌.toString())) {
      么九牌unique.push(牌)
    } else {
      么九牌rest.push(牌)
    }
  }
  return {
    么九牌unique,
    么九牌rest,
    rest,
  }
}
