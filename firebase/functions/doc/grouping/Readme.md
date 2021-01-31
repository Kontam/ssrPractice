## GroupingAPI
パス： /GroupingAPI

#### GET
グループ名と１グループあたりの人数を指定すると、その人数ごとにグループ分けしたchoiceOptionsの配列を返す

| パラメータ名 | type   | 説明                     |
|:-------------|:-------|:-------------------------|
| groupName    | string | 抽選対象のグループの名前 |
| amount       | number | １グループあたりの人数   |

返却値: Array<Array<choiceOptions>>
