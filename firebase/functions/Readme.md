# Suebot Management API

## セットアップ
functionsディレクトリ配下にserviceAccount.jsonを設置する
firebaseコンソールからダウンロードすること

## 開発環境
開発用、本番用にprojectは２つ存在する  
開発環境の場合はserviceAccountDev.jsonを設置し、以下の環境変数を設定する  
(ローカルで実行する際には.runtimeconfig.jsonに環境変数を出力してfunctionsディレクトリ配下に設置する)  
|パラメータ名|type|説明|
|:-----|:-----|:-----|
|general.devproject|string|開発環境に開発用firebaseプロジェクトのIDを登録する 本番PJでは設定不要|


## APIリファレンス

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


## authorityAPI
パス： /authorityAPI

### GET
権限取得API
ログインユーザーのメールアドレスに対応した権限種別を返却する

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|email|string|ログインしたユーザーのEmailアドレス|

返却値: Object { authority: string }


## choiceGroupsAPI
パス： /choiceGroupsAPI

#### GET
Firebaseに格納されたチョイスグループデータを全て一覧形式で返却する
ChoiceGroupsはそのプロパティにchoiceOptionsを持ち、groupに所属するOptionのデータをフロントに送信する

|パラメータ名|type|説明|
|:-----|:-----|:-----|

返却値: Array<choiceGroup>

#### POST
bodyで渡されたチョイスグループのデータをDBに登録する

##### body
|パラメータ名|type|説明|
|:-----|:-----|:-----|
|groupName|string|論語の本文|
|choiceOptions|array|グループに所属するoptionの配列|

##### choiceOptions
|パラメータ名|type|説明|
|:-----|:-----|:-----|
|choiceName|string|choiceの名前|
|choiceEnabled|boolean|choiceが有効かどうかのフラグ|

返却値: 挿入されたchoiceGroup ※送信値に採番されたIDが付加される


#### PATCH
指定されたIDの論語データをbodyの内容で編集する

##### body
|パラメータ名|type|説明|
|:-----|:-----|:-----|
|groupId|string|編集対象のgroupのDBのdocId|
|groupName|string|チョイスグループの名前|
|choiceOptions|array|グループに所属するoptionの配列|

##### choiceOptions
|パラメータ名|type|説明|
|:-----|:-----|:-----|
|choiceId|string|グループごとに一意なoptionのdocId|
|choiceName|string|choiceの名前|
|choiceEnabled|boolean|choiceが有効かどうかのフラグ|

返却値: 修正後のchoiceGroup


#### DELETE
URLパラメータで指定されたIDのチョイスグループのデータを削除する

|パラメータ名|type|説明|
|:-----|:-----|:-----|
|groupId|string|編集対象のチョイスグループのid|

返却値: 削除されたチョイスグループのid
