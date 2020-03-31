# Suebot Management Console
動作デモ
https://longos.herokuapp.com/ 

## 概要
Slack Bot 「suebot」で利用する情報を登録できるWeb画面です。
Googleアカウントによる認証により権限を制御しています。

## 環境変数
プロジェクトルートに.envファイルを作成し、以下の環境変数を用意すること  

|変数名|Type|説明|
|:-----|:-----:|:-----|
|SESSION_SECRET|string|セッションのシークレット文字列|
|BACKEND_ENDPOINT|string|Longo ListのエンドポイントとなるURL|
|FIREBASE_PROJECT_ID|string|Firebase ServiceAccount.jsonからコピーで良い|
|FIREBASE_PROJECT_EMAIL|string|Firebase ServiceAccount.jsonからコピーで良い|
|FIREBASE_PROJECT_KEY|string|Firebase ServiceAccount.jsonからコピーで良い|


