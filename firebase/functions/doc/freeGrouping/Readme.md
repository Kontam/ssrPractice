## FreeGroupingAPI
パス： /freeGroupingAPI

#### GET
任意の配列とグループあたりの人数を渡すとグループ分けした配列を返す

| パラメータ名 | type   | 説明                   |
|:-------------|:-------|:-----------------------|
| group        | array  | グループ分け対象の配列 |
| amount       | number | １グループあたりの人数 |

返却値: Array<Array<any>>
