# 画像marge用のAPI

## デプロイ

```zsh
$ gcloud functions deploy margeImage --env-vars-file .env.yaml --runtime nodejs16 --trigger-http --allow-unauthenticated --region asia-northeast1
```

## CI環境

### レビュー環境

```
$ base64 -i serviceAccount.review.json | pbcopy
```

```
$ base64 -i .env.yaml | pbcopy
```


### 本番環境

```
$ base64 -i serviceAccount.production.json | pbcopy
```

```
$ base64 -i .env.production.yaml | pbcopy
```
