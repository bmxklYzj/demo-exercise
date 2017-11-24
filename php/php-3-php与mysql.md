# php-3-php与myslq

1. mysql数据库入门：
	mac 下xampp首先要使用数据库的一个角色进入。进入mysql命令： mysql -u root -p
	
	```
	显示所有的数据库： show databases;
	进入某一个数据库：use dbName;
	显示某个数据库的所有表：show tables;
	显示某个数据库中某个表的结构：describe tableName;
	
	创建数据库：create database dbName;
	创建表： create table tableName (clolumns)
	```
	
	![演示图片](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2017-06-17/db.png)
	
2. 索引：对一个不是主键的列进行频繁查询时，可以对其增加索引，使用 `create index`语句，具体查询手册

3. 插入：

	```sql
	insert into tableName [(column1, ... , columnn)] values (value1, ... , valuen);
	```
	
	指定特定的列和乱序的列时，必须要指明列名。

4. 查询：

	```sql
	// example
	select name, sex
	from user
	where num = 5
	roder by age desc;
	```
	
5. php与mysql交互，需要注意的是，php操作数据库的函数有两种写法，一种是面向对象的方式，另一种是面向过程的方式。
	1. 在面向对象的方式中，需要先`new mysqli()` new一个数据库连接对象，然后之后都是直接对这个对象取属性和方法进行操作。
	2. 在面向过程的方式中，函数方法基本都有一个`mysql_`的前缀

需要注意这两种方式的函数参数有些许不同，总之就是要区分开两种方式，不要弄混了。

	```php
	// php连接mysql进行数据库操作
	
	$db = new mysqli('localhost', 'root', '', 'test_hello');
	if ($db->connect_errno) {
	    echo 'database connect error';
	    die();
	}
	
	$sql = 'select * from customers';
	$result = $db->query($sql);
	$count = $result->num_rows; // 查询返回的总个数
	
	$output = 
	'<table>
	    <tr>
	        <th>customerid</th>
	        <th>name</th>
	        <th>address</th>
	        <th>city</th>
	    </tr>
	';
	while ($row = $result->fetch_assoc()) {
	    $output = $output.'
	        <tr>
	            <td>'.$row["customerid"].'</td>
	            <td>'.$row["name"].'</td>
	            <td>'.$row["address"].'</td>
	            <td>'.$row["city"].'</td>
	        </tr>
	    ';
	}
	
	$output = $output.'</table>';
	echo $output;
	
	$result->free();
	$db->close();
	```