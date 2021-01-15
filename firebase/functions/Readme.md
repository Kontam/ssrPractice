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
|general.apisecret|string|apiKeyの照合に必要な秘密文字列|
|general.apikey|string|第三者からのAPI利用を抑制する秘密文字列|

