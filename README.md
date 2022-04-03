# memoirツール

memoirで使用するルール、共通の設定をコードで管理する。

## 本番環境デプロイ

```zsh
$ git checkout main
$ git pull --ff-only origin main
$ git tag -a v1.0.0 -m 'リリース内容'
$ git push origin v1.0.0
```
