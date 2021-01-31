## choiceGroupsAPI
パス： /choiceGroupsAPI

#### GET
Firebaseに格納されたチョイスグループデータを全て一覧形式で返却する
ChoiceGroupsはそのプロパティにchoiceOptionsを持ち、groupに所属するOptionのデータをフロントに送信する

| パラメータ名 | type | 説明 |
|:-------------|:-----|:-----|

返却値: Array<choiceGroup>

#### POST
bodyで渡されたチョイスグループのデータをDBに登録する

##### body
| パラメータ名  | type   | 説明                           |
|:--------------|:-------|:-------------------------------|
| groupName     | string | 論語の本文                     |
| choiceOptions | array  | グループに所属するoptionの配列 |

##### choiceOptions
| パラメータ名  | type    | 説明                         |
|:--------------|:--------|:-----------------------------|
| choiceName    | string  | choiceの名前                 |
| choiceEnabled | boolean | choiceが有効かどうかのフラグ |

返却値: 挿入されたchoiceGroup ※送信値に採番されたIDが付加される

#### PATCH
指定されたIDの論語データをbodyの内容で編集する

##### body
| パラメータ名  | type   | 説明                           |
|:--------------|:-------|:-------------------------------|
| groupId       | string | 編集対象のgroupのDBのdocId     |
| groupName     | string | チョイスグループの名前         |
| choiceOptions | array  | グループに所属するoptionの配列 |

##### choiceOptions
| パラメータ名  | type    | 説明                              |
|:--------------|:--------|:----------------------------------|
| choiceId      | string  | グループごとに一意なoptionのdocId |
| choiceName    | string  | choiceの名前                      |
| choiceEnabled | boolean | choiceが有効かどうかのフラグ      |

返却値: 修正後のchoiceGroup


#### DELETE
URLパラメータで指定されたIDのチョイスグループのデータを削除する

| パラメータ名 | type   | 説明                           |
|:-------------|:-------|:-------------------------------|
| groupId      | string | 編集対象のチョイスグループのid |

返却値: 削除されたチョイスグループのid


