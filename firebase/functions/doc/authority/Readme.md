## authorityAPI
パス： /authorityAPI

### GET
権限取得API
ログインユーザーのメールアドレスに対応した権限種別を返却する

| パラメータ名 | type   | 説明                                |
|:-------------|:-------|:------------------------------------|
| email        | string | ログインしたユーザーのEmailアドレス |

返却値: Object { authority: string }


