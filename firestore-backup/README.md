# Firestoreの定期バックアップ

[memoir-backend](https://github.com/wheatandcat/memoir-backend)のFirestoreの定期バックアップする

以下のドキュメントを元に作成
https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja

## セットアップ

https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja

```
$ gcloud projects add-iam-policy-binding PROJECT_ID \
    --member serviceAccount:PROJECT_ID@appspot.gserviceaccount.com \
    --role roles/datastore.importExportAdmin
```

```
$ gsutil iam ch serviceAccount:PROJECT_ID@appspot.gserviceaccount.com:admin \
    gs://BUCKET_NAME
```


## コマンド

## プロジェクト切り替え

### レビュー環境

```
$ firebase use review
```

### 本番環境

```
$ firebase use production
```

## デプロイ

```
$ firebase deploy --only functions
```
