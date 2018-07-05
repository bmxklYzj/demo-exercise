# mongodb 基本概念

## mongodb 概念

1. db： 数据库
2. collection ：结集合，集合是没有固定模式的表
3. document ：文档，一行记录

## 启动

通过bower安装mongodb `brew install mongodb`

注意区分两个命令： `mongod` 是启动mongodb数据库服务的， `mongo` 是进入使用js操作数据库的shell的命令。

通过 `mongod` 启动数据库，可能一会遇到提示“/data/db文件夹不存在”，使用 `mkdir -p /data/db`，也可能会提示没有权限，那么把 /data 权限修改即可。

接下来使用 `mongo` 即可进入shell。

## mongodb 原生操作

- `use <db-name>` 数据库存在则切换到该库，否则创建新库
- `show dbs` 列出数据库名称
- `db` 返回当前所在的数据库
- `show collections` 返回当前db中的所有collection
- 删除数据库db-name: 进入db-name并执行 `db.dropDatabase()`
- 删除表（collection）: `db.<collection-name>.drop()`

    例如：
    ```
    use testyzj;
    db.user.insert({a: 1});
    db.user2.insert({b: 2});
    db.user2.drop();
    // command returns 'true'
    ```

CRUD(创建、读取、更新、删除)

### 创建 `db.user.insert()`

先创建一些document：
```
var shell = '';
for (var i = 0; i < 3; i++) {
    shell += `db.user.insert({name: 'name${i}', age: ${20 + i}, other: '${String.fromCharCode('A'.charCodeAt(0) + i)}'});`
}
// 生成以下内容复制到mongodb的命令行中
"db.user.insert({name: 'name0', age: 20, other: 'A'});db.user.insert({name: 'name1', age: 21, other: 'B'});db.user.insert({name: 'name2', age: 22, other: 'C'});db.user.insert({name: 'name100', age: 100, other: '100'});"
```

### 查找 `db.user.find()`

```
返回结果：
{ "_id" : ObjectId("5b3d0610b44a754d4a884a80"), "name" : "name0", "age" : 20, "other" : "A" }
{ "_id" : ObjectId("5b3d0610b44a754d4a884a81"), "name" : "name1", "age" : 21, "other" : "B" }
{ "_id" : ObjectId("5b3d0610b44a754d4a884a82"), "name" : "name2", "age" : 22, "other" : "C" }
{ "_id" : ObjectId("5b3d0697b44a754d4a884a83"), "name" : "name100", "age" : 100, "other" : "100" }
```

find函数第一个参数是查询条件，第二个参数是指定返回哪些值
```
db.user.find({name: /name1/}, {age: 1, '_id': 0}).limit(1)
// { "age" : 21 }
```

### 更新 `db.user.update()`

```
db.user.update({name: 'name1'}, {$set: {age: 0}})
```

### 删除 `db.user.deleteOne({name: 'name100'})`

```
db.user.deleteOne({name: 'name100'})
// 返回
{ "acknowledged" : true, "deletedCount" : 1 }
```

计数 `db.user.count()`
