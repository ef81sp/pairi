import type { T面子 } from "../手牌utils.type.mjs"

export const is暗刻 = (面子: T面子): boolean => {
  return (
    面子.component[0].toEqual(面子.component[1]) && 面子.component[0].toEqual(面子.component[2])
  )
}
