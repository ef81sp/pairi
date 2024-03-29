export type Suit数牌 = "m" | "p" | "s"
export type Suit字牌 = "z"
export type Suit = Suit数牌 | Suit字牌
export type Number数牌 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Number字牌 = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Str数牌 = `${Number数牌}${Suit数牌}`
export type Str字牌 = `${Number字牌}${Suit字牌}`
export type Str牌 = Str数牌 | Str字牌

export type Number塔子 = [Number数牌, Number数牌]
export type Number面子 = [Number数牌, Number数牌, Number数牌]
