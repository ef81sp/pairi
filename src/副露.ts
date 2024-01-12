import { 牌 } from "./牌"

type T宣言 = "ポン" | "チー" | "大明槓" | "加槓" | "暗槓"
type T誰から = "上家" | "対面" | "下家"
type 副露InputDataポンチー = {
  call: "ポン" | "チー"
  called牌: 牌
  other牌: [牌, 牌]
  from: T誰から
}
type 副露InputDataカン = {
  call: "大明槓" | "加槓" | "暗槓"
  called牌: 牌
  other牌: [牌, 牌, 牌]
  from: T誰から
}

/**
 * Represents a 副露 (Furo) in a Japanese Mahjong game.
 */
export class 副露 {
  /** The declaration type of the 副露. */
  readonly call: T宣言
  /** The tile that was melded. */
  readonly called牌: 牌
  /** The other tiles involved in the meld. */
  readonly other牌: [牌, 牌, 牌?]
  /** The player from whom the meld was declared. */
  readonly from: T誰から

  /**
   * Creates a new instance of the 副露 class.
   * @param 宣言 The declaration type of the 副露.
   * @param 鳴いた牌 The tile that was melded.
   * @param ほかの牌 The other tiles involved in the meld.
   * @param 誰から The player from whom the meld was declared.
   */
  constructor({ call, called牌, other牌, from }: 副露InputDataポンチー | 副露InputDataカン) {
    this.call = call
    this.called牌 = called牌
    this.other牌 = other牌
    this.from = from
  }

  /**
   * Converts the 副露 to a list of tiles.
   * @returns An array of tiles involved in the meld.
   */
  to牌List() {
    if (this.other牌[2]) {
      return [this.called牌, this.other牌[0], this.other牌[1], this.other牌[2]]
    }
    return [this.called牌, this.other牌[0], this.other牌[1]]
  }
}
