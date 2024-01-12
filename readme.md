# pairi
日本麻雀の手牌解析ライブラリ

## 機能
- 有効牌を自動算出します
  - テンパイのときは待ち牌
  - ノーテンのときはシャンテン数の進む牌
- 手牌14枚のときは、打牌候補とその有効牌・枚数を算出します
- 短い手牌にも対応
  - 対応枚数: 1, 4, 7, 10, 13
- 5ブロック形、七対子、国士無双に対応

## インストール
```sh
pnpm i ef81sp/pairi.git
```

## ライセンス
MIT

## 使い方
```typescript
import { 牌, 手牌 } from 'pairi'

// 手牌コンストラクターに牌の配列を渡します
// 要素数は1, 4, 7, 10, 13に対応しています
const hand = new 手牌([
  // 牌には `1m`, `2p` `3s`, `7z` のような文字列を渡します
  new 牌("1m"),
  new 牌("1m"),
  new 牌("1m"),
  new 牌("2m"),
  new 牌("3m"),
  new 牌("4m"),
  new 牌("5m"),
  new 牌("6m"),
  new 牌("7m"),
  new 牌("8m"),
  new 牌("9m"),
  new 牌("9m"),
  new 牌("9m"),
])

// シャンテン数、有効牌、有効牌の残り枚数を取得できます
const result13 = hand.getAnalysisResult13()

console.log(result13.シャンテン数)
// 0

console.dir(result13.有効牌, { depth: null })
/*
[
  牌 { suit: "m", number: 1, "is赤牌": false, "str牌": "1m" },
  牌 { suit: "m", number: 2, "is赤牌": false, "str牌": "2m" },
  牌 { suit: "m", number: 3, "is赤牌": false, "str牌": "3m" },
  牌 { suit: "m", number: 4, "is赤牌": false, "str牌": "4m" },
  牌 { suit: "m", number: 5, "is赤牌": false, "str牌": "5m" },
  牌 { suit: "m", number: 6, "is赤牌": false, "str牌": "6m" },
  牌 { suit: "m", number: 7, "is赤牌": false, "str牌": "7m" },
  牌 { suit: "m", number: 8, "is赤牌": false, "str牌": "8m" },
  牌 { suit: "m", number: 9, "is赤牌": false, "str牌": "9m" }
]
*/

console.dir(result13.remaining有効牌num, { depth: null })
/*
Map(9) {
  "1m" => {
    "牌": 牌 { suit: "m", number: 1, "is赤牌": false, "str牌": "1m" },
    remains: 1
  },
  "2m" => {
    "牌": 牌 { suit: "m", number: 2, "is赤牌": false, "str牌": "2m" },
    remains: 3
  },

  ...

  "8m" => {
    "牌": 牌 { suit: "m", number: 8, "is赤牌": false, "str牌": "8m" },
    remains: 3
  },
  "9m" => {
    "牌": 牌 { suit: "m", number: 9, "is赤牌": false, "str牌": "9m" },
    remains: 1
  }
}
*/

// =========================

// 1枚ツモった状態にも対応
hand.doツモ(new 牌("4s"))

// Mapで、打牌候補と、それを打牌したときのシャンテン数、有効牌、有効牌の残り枚数を取得できます
const result14 = hand.getAnalysisResult14()
console.log(result14)
/*
Map(10) {
  "1m" => {
    "打牌": 牌 { suit: "m", number: 1, "is赤牌": false, "str牌": "1m" },
    analysisResult: {
      "シャンテン数": 1,
      "有効牌": [
        牌 { suit: "m", number: 1, "is赤牌": false, "str牌": "1m" },
        牌 { suit: "m", number: 2, "is赤牌": false, "str牌": "2m" },
        
        ...

        牌 { suit: "s", number: 5, "is赤牌": false, "str牌": "5s" },
        牌 { suit: "s", number: 6, "is赤牌": false, "str牌": "6s" }
      ],
      "remaining有効牌num": Map(14) {
        "1m" => {
          "牌": 牌 { suit: "m", number: 1, "is赤牌": false, "str牌": "1m" },
          remains: 1
        },
        "2m" => {
          "牌": 牌 { suit: "m", number: 2, "is赤牌": false, "str牌": "2m" },
          remains: 3
        },
       
        ...
        
        "5s" => {
          "牌": 牌 { suit: "s", number: 5, "is赤牌": false, "str牌": "5s" },
          remains: 4
        },
        "6s" => {
          "牌": 牌 { suit: "s", number: 6, "is赤牌": false, "str牌": "6s" },
          remains: 4
        }
      }
    }
  },
  "2m" => {
    "打牌": 牌 { suit: "m", number: 2, "is赤牌": false, "str牌": "2m" },
      "シャンテン数": 1,
      "有効牌": [

  ...
*/
```

---

## API

### 牌クラス

麻雀の牌を表現します。

#### プロパティ

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `suit` | \| `"m"` <br>\| `"p"` <br>\| `"s"` <br>\| `"z"` | 牌の種類を表します。<br>それぞれ、マンズ、ピンズ、ソーズ、字牌です。 |
| `number` | `number` | 牌の数字を表します。数牌は1-9、字牌は1-7です。 |
| `is赤牌` | `boolean` | 牌が赤牌（5の牌の赤色バージョン）であるかどうかを表します。 |
| `str牌` | `Str牌` | 牌の文字列表現を表します。<br> 例: `"1m"`、`"4p"`、`"7s"`、`"3z"` |

#### `constructor(pai: Str牌, isRed: boolean): 牌`

牌のインスタンスを作成します。

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pai` | `Str牌` | 牌の文字列表現。<br> 例: `"1m"`、`"4p"`、`"7s"`、`"3z"` |
| `isRed` | `boolean` | 牌が赤牌であるかどうか。デフォルトは`false`。 |

#### `toString(): Str牌`

牌の文字列表現を返します。
例: `"1m"`、`"4p"`、`"7s"`、`"3z"`


#### `toEqual(pai: 牌): boolean`

他の牌と等しいかどうかをチェックします。

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pai` | `牌` | 比較対象の牌。 |

#### `clone(): 牌`

同一の牌の新しいインスタンスを作成して返します。

---

### 副露クラス
副露の構成を表現します。

#### プロパティ

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `call` | \| `"ポン"` <br>\| `"チー"` <br>\| `"大明槓"` <br>\| `"加槓"` <br>\| `"暗槓"` | 副露の宣言タイプを示します |
| `called牌` | `牌` | 鳴いた牌を示します。 |
| `other牌` | `[牌, 牌, 牌?]` | 鳴いた牌以外の牌(手牌から出した牌)を示します。これは2つまたは3つの牌の配列です。 |
| `from` | \| `"上家"` <br>\| `"対面"` <br>\| `"下家"` | どのプレイヤーから鳴いたかを示します。 |

これらのプロパティはすべて読み取り専用で、`副露`クラスのインスタンスが作成されるときに設定されます。

#### `to牌List(): 牌[]`
副露に含まれる牌の配列を返します。

---

### 手牌クラス

#### プロパティ
以下に、`手牌`クラスのプロパティについての詳細を記載します。

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `普通` |  \| `[牌]` <br>\| `[牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]` | 手牌の中の通常の牌を表します<br>。これは牌のタプルで、配列の長さは1, 4, 7, 10, 13のいずれかです。 |
| `副露?` |`[]` <br>\| `[副露]` <br>\| `[副露, 副露]` <br>\| `[副露, 副露, 副露]` <br>\| `[副露, 副露, 副露, 副露]` | 手牌の中の副露を表します。<br>これは副露のタプルで、配列の長さは0から4までのいずれかです。 |
| `ツモ` | `牌 \| null` | プレイヤーが最後に引いた牌を表します。プレイヤーがまだ牌を引いていない場合、この値はnullです。 |

#### `constructor(普通: T手牌普通, 副露?: T手牌副露): void`

手牌のインスタンスを作成します。

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `普通` | <br>\| `[牌]`<br>\| `[牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]` <br>\| `[牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]` | 手牌の通常の牌を渡します。 |
| `副露?` | <br>\|`[]` <br>\| `[副露]` <br>\| `[副露, 副露]` <br>\| `[副露, 副露, 副露]` <br>\| `[副露, 副露, 副露, 副露]` | 手牌の副露の牌を渡します。<br>これは任意項目です。 |

#### `toString普通(): string`

`普通` の牌をすべて文字列化したものを返します。
例: `"1m2m3m4m5m6m7m8m9m"`

#### `doツモ(ツモ: 牌): void`

指定された牌を `ツモ` にセットします。

| 引数 | 型 | 説明 |
| --- | --- | --- |
| ツモ | 牌 | - |

#### `do副露(副露: 副露): void`

副露を追加します。
このとき、`副露.other牌` に含まれる牌は `this.普通` から除外されます。
あまり使いません。

| 引数 | 型 | 説明 |
| --- | --- | --- |
| 副露 | `副露` | - |

#### `do打牌(打牌: { type: "ツモ切り" } | { type: "ツモ後手出し"; 牌: 牌 } | { type: "副露後手出し"; 牌: 牌 }): void`

指定された牌を `普通` から除外します。
typeが `"ツモ切り"` の場合、 `ツモ` を null にします。
あまり使いません。

| 引数 | 型 | 説明 |
| --- | --- | --- |
| 打牌 | \| `{ type: "ツモ切り" }` <br>\| `{ type: "ツモ後手出し"; 牌: 牌 }` <br>\| `{ type: "副露後手出し"; 牌: 牌 }` | 打牌アクション |

#### `getAnalysisResult13(): AnalysisResult13 | null`

打牌後の `普通` (1,4,7,10,13枚) の牌について解析した結果を返します。
`ツモ` があるときは、 null を返します。

#### `getAnalysisResult14(): AnalysisResult14 | null`

1枚ツモ後の `普通` (2,5,8,11,14枚) の牌について解析した結果を返します。
以下のMapを返します。

|KV|型|説明|
| - | - | - |
|キー| `Str牌` | `普通` に含まれる牌の文字列|
|バリュー| `{ 打牌: 牌; analysisResult: AnalysisResult13 }` | キーの牌と、その牌を除いた場合の `AnalysisResult13` のオブジェクト |

---

### `AnalysisResult13`
解析結果のオブジェクトです。
手牌について、5ブロック形、七対子、国士無双の3パターンで解析を行い、もっともシャンテン数の低いものの結果が返されます。

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `シャンテン数` | `number` | シャンテン数を表します。 |
| `有効牌` | `牌[]` | 有効牌（シャンテン数が進む牌）のリストを表します。これは牌の配列です。 <br> テンパイの場合、待ち牌として扱うことができます。 |
| `remaining有効牌num` | `Map<Str牌, {牌: 牌, remains: number}>` | 手牌で使用している牌を除外した、残りの有効牌の数を表します。<br>これは`Str牌`（牌を表す文字列）をキーとし、その牌とその牌の残り数を値とするマップです。 |
| `analysisResult` | `AnalysisResult手牌13` | 手牌の詳細な解析結果を表します。これは`AnalysisResult手牌13`型のオブジェクトで、`_5ブロック`、`七対子`、`国士無双`の3つの解析結果を含みます。 |

#### AnalysisResult手牌13
5ブロック形、七対子、国士無双の3パターンの詳細な解析結果です。
あまり使わない想定ですが、役に立つかもしれません。

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `_5ブロック` | `AnalysisResult13Common & { indivisuals: AnalysisResult5ブロックIndivisual[] }` | 5ブロック解析結果を表します。<br>ブロックの分け方が複数パターンある場合、その全てのパターンと待ち牌を保持します。 |
| `七対子` | `AnalysisResult13Common` | 七対子として見た場合の解析結果を表します。あまり使いません。 |
| `国士無双` | `AnalysisResult13Common` | 国士無双として見た場合の解析結果を表します。あまり使いません。 |

##### `AnalysisResult13Common`

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `シャンテン数` | `number` | シャンテン数を表します。 |
| `有効牌` | `牌[]` | 有効牌（シャンテン数が進む牌）のリストを表します。これは牌の配列です。 <br> テンパイの場合、待ち牌として扱うことができます。 |

##### `AnalysisResult5ブロックIndivisual`
5ブロックの場合、ブロックの分け方が複数パターンにわたるケースがあります。
そのすべてのパターンを保持しています。

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `シャンテン数` | `number` | シャンテン数を表します。 |
| `ブロック` | `ExtractResult5ブロック` | 5ブロックの抽出結果を表します。これは`ExtractResult5ブロック`型のオブジェクトです。 |
| `有効牌` | `牌[]` | 有効牌(テンパイの場合は待ち牌)のリストを表します。これは牌の配列です。 |

##### `ExtractResult5ブロック` 

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `雀頭` | `T雀頭 \| null` | 雀頭を表します。これは`T雀頭`型のオブジェクトまたはnullです。<br>単騎待ちの場合はnullになります。 |
| `面子` | `T面子[]` | 面子のリストを表します。これは`T面子`型のオブジェクトの配列です。 |
| `塔子` | `T塔子[]` | 塔子のリストを表します。これは`T塔子`型のオブジェクトの配列です。 |
| `rest` | `T手牌Suit別` | 残りの手牌(浮き牌)を表します。これは`T手牌Suit別`型のオブジェクトです。 |

###### `T雀頭`
| プロパティ名 | 型 |
| --- | --- |
| `type` | `"雀頭"` |
| `component` | `[牌, 牌]` |

###### `T面子`
| プロパティ名 | 型 |
| --- | --- |
| `type` | `"面子"` | 
| `component` | `[牌, 牌, 牌]` |

###### `T塔子`
| プロパティ名 | 型 |
| --- | --- |
| `type` | `"塔子"` | 
| `component` | `[牌, 牌]` |

###### T手牌Suit別
| プロパティ名 | 型 |
| --- | --- |
| `m` | `牌[]`
| `p` | `牌[]`
| `s` | `牌[]`
| `z` | `牌[]`