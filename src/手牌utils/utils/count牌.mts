import { flattenRest } from "../seek有効牌.mjs"
import type { ExtractResult5ブロック } from "../手牌utils.type.mjs"

export const count牌 = (extractResult5ブロック: ExtractResult5ブロック): number => {
  let count = 0
  if (extractResult5ブロック.雀頭) count += 2
  count += extractResult5ブロック.面子.length * 3
  count += extractResult5ブロック.塔子.length * 2
  count += flattenRest(extractResult5ブロック.rest).length
  return count
}
