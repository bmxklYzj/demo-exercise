# neo4j

## 图数据库和传统关系数据库比较

https://www.cnblogs.com/yin-jihu/p/17983407

在关系型数据库和图数据库(Neo4j)之间进行了实验：在一个社交网络里找到 大深度为5的朋友的朋友，他们的数据集包括100万人，每人约有50个朋友。

| 深度                       | sql                                                          | 数据量             |
| -------------------------- | ------------------------------------------------------------ | ------------------ |
| 1 某个人的朋友             | where id=某个人                                              | 50                 |
| 2 某个人的朋友的朋友       | 第一步：where id=某个人；<br>第二步：where id=in (1,...,50)  | `50*50` 遍历2次    |
| 3 某个人的朋友的朋友的朋友 | 第一步：where id=某个人；<br/>第二步：where id=in (1,...,50)<br/>第三步：where id=in (1,...,2500)<br/> | `50*50*50` 遍历3次 |

![image-20250417155856841](http://image.huawei.com/tiny-lts/v1/images/hi3ms/667acfb07613f9044801d3e1245586b0_2123x1047.png)

## 安装

1. 下载社区版（官网下载不了，在w3上搜的）：xxx
2. 解压后进入bin目录，用windows cmd打开，执行`neo4j console`
3. 启动完成后访问url：`http://localhost:7474/`

## cipher语法

参考：[手把手教你快速入门知识图谱 - Neo4J教程](https://zhuanlan.zhihu.com/p/88745411)

### 删除数据库中以往的图

```
match (n) detach delete n
```

### 创建人物节点

```
CREATE (n:Person {name:'John'}) RETURN n
```

批量创建

方式1：

```
CREATE  
    (a:Person {name:'Sally'}),
    (b:Person {name:'Steve'}),
    (c:Person {name:'Mike'}),
    (d:Person {name:'Liz'}),
    (e:Person {name:'Shawn'})
RETURN a, b, c, d, e
```

方式2：

```
unwind ['Sally', 'Steve', 'Mike', 'Liz', 'Shawn'] as names create (n: Person {name: names}) return n
```

UNWIND （展开） 的作用是：把列表变成一行一行的数据，赋值给 变量，你可以在后续的 CREATE 或 MATCH 中使用这个变量。

```
UNWIND [元素1, 元素2, ...] AS 变量
```

更复杂的对象例子

```
unwind [
    {city:'Miami', state:'FL'},
    {city:'Boston', state:'MA'},
    {city:'Lynn', state:'MA'},
    {city:'Portland', state:'ME'},
    {city:'San Francisco', state:'CA'}
] as location
create (l: Location {city: location.city, state: location.state}) return l

unwind [
    {name:'Liz', city:'Boston', year:1981},
    {name:'Mike', city:'San Francisco', year:1960},
    {name:'Shawn', city:'Miami', year:1960},
    {name:'Steve', city:'Lynn', year:1970}
] as bornRel
match (a: Person {name: bornRel.name}), (b: Location {city: bornRel.city}) merge (a)-[:BORN_IN {year: bornRel.year}]->(b)
```

### 创建关系

```
MATCH (a:Person {name:'Liz'}), 
      (b:Person {name:'Mike'}) 
MERGE (a)-[:FRIENDS]->(b)
```

关系的一般形式:

```
()-[]->()
```

关系也可以有属性

```
match (a:Person {name: 'Shawn'}),
      (b:Person {name: 'Sally'})
merge (a)-[:FRIENDS {since: 2001}]->(b)
```

### 删除关系

```
match (:Person {name: 'Liz'})-[r]->(:Person {name: 'Shawn'})
delete r
```

### 查询

1. 查询所有在Boston出生的人物

   ```
   match (a: Person)-[:BORN_IN]->(b: Location {city: 'Boston'}) return a
   ```

2. 查询所有有关系的节点

   ```
   MATCH (a)-->() RETURN a
   
   等价于
   MATCH (a)-[]->() RETURN a
   ```

3. 查询所有关系

   ```
   match p=()-->() return p
   
   或
   match p=()-[]->() return p
   ```

4. 查找某人的朋友的朋友

   ```
   MATCH (a:Person {name:'Mike'})-[r1:FRIENDS]-()-[r2:FRIENDS]-(friend_of_a_friend) RETURN friend_of_a_friend.name AS fofName
   ```

### 创建节点的时候就创建关系

```
create (a: Person {name: 'Todd'})-[r:FRIENDS]->(b: Person {name: 'Carlos'})
```

### 修改属性：set

  ```
MATCH (a:Person {name:'Liz'}) SET a.age=34
  ```

### 删除属性: remove

```
match (p:Person{name: 'Liz'}) set p.testAttr = 'test'
match (p:Person{name: 'Liz'}) remove p.testAttr
```

### 删除节点

```
match (l:Location{city: 'Portland'}) delete l
```

如果节点有关系会报错，需要先删除关系

```
match (p:Person{name: 'Carlos'}) detach delete p
```



