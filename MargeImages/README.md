# 画像marge用のAPI

## デプロイ

```zsh
$ gcloud functions deploy margeImage --env-vars-file .env.yaml --runtime nodejs16 --trigger-http --allow-unauthenticated --region asia-northeast1
```