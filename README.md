# create-nest-tpl
Nest(Typescript) のWebアプリケーション雛形作成スクリプト。

インストール後 ~ /ceate-nest-tpl/bin にPATHを通し、下記コマンド実行。
```
create-nest-tpl <appname>
```

スクリプト実行途中にJWT認証用の秘密鍵の入力が要求されるため、
ランダム文字列を入力。( .envファイルに設定される ）
```
Please enter JWT_SECRET_KEY:
```

* フォルダ構成 + JWT認証(cookie)
* /api/login ... username/password
* /api/signup
