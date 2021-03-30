# Firestoreの設定

[memoir-backend](https://github.com/wheatandcat/memoir-backend)のFirestoreのconfigを記載

## コマンド

### indexesをデプロイ

```
$ firebase deploy --only firestore:indexes
```

### 最新のindexesで上書き

```
$ firebase firestore:indexes > firestore.indexes.json
```