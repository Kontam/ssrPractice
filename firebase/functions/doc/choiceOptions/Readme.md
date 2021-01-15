## choiceOptionsAPI
パス： /choiceOptionsAPI

#### GET
渡されたグループ名に一致するグループから渡された人数をランダムに抽選してメンバーの名前の配列を返す。

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|groupName|string|抽選対象のグループの名前|
|amount|number|抽出したい人数|

返却値: Array<string>

