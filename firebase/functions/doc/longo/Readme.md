### longoAPI
パス： /longoAPI

#### GET
Firebaseに格納された論語データを全て一覧形式で返却する

|パラメータ名|type|説明|
|:-----|:-----|:-----|

返却値: Array<Longo>

#### POST
bodyで渡された論語データをDBに登録する

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|text|string|論語の本文|
|meaning|string|論語の意味|
|comment|string|論語に対するコメント|

返却値: Longo ※送信値に採番されたIDが付加される


#### PATCH
指定されたIDの論語データをbodyの内容で編集する

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|id|string|編集対象の論語のid|
|text|string|論語の本文|
|meaning|string|論語の意味|
|comment|string|論語に対するコメント|

返却値: 修正後のLongo


#### DELETE
指定されたIDの論語データを削除する

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|id|string|編集対象の論語のid|

返却値: 削除された論語のid

