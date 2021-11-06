# Firebaseの設定

[memoir-backend](https://github.com/wheatandcat/memoir-backend)のFirestoreのconfigを記載

# コマンド

## プロジェクト切り替え

### レビュー環境

```
$ firebase use review
```

### 本番環境

```
$ firebase use production
```


## firestore

### indexes

#### デプロイ

```
$ firebase deploy --only firestore:indexes
```

#### 最新のindexesで上書き

```
$ firebase firestore:indexes > firestore.indexes.json
```


### rules

#### デプロイ

```
$ firebase deploy --only firestore:rules
```

## storage


### rules

#### デプロイ

```
$ firebase deploy --only storage:rules
```



