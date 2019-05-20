# python-1-概要
0. python 的特异之处：
	1. 使用缩进而不是`{}`，同时`if/elif/else/while`等语句后面要使用`:`
	2. 没有自增、自减符 `++  --`
	3. True/Flase要首字母大写

1.  数据类型： 整数、浮点型、字符串、布尔值（两种：True、False，**注意，首字母大写**）None（类似于js中Null）还有列表、字典等多种数据类型，还允许创建自定义数据类型。

	数据转换函数：
	转换成整形：int()、转成浮点型：float()、转成字符串：str()。字符串判断长度：len()

	**变量本身类型不固定的语言称之为动态语言，与之对应的是静态语言。python/php/javascript均是动态语言，c/c++/java是静态语言**
	
2. python中注释为`#`，与sql语句的注释相同。`//`为整除操作
	
3. 比较操作：
	1. 相等符 `==`：注意字符串与整形、浮点型比较永不相等。浮点与整形可能相等。

		```py
		'42' == 42 # False
		'42.0' == 32 # False
		42.0 == 42 # True
		42.01 == 42 # False
		```
	
	2. `< > <=  >=`这些比较符号真能比较整数和浮点数

4. 布尔操作符：`and/or/not`

	```py
	True and 2 # 2
	False or 2 # 2
	(3 < 4) and (5 < 6) # True
	(3 < 4) and (5 == 6) # False
	```
5. 代码块：代码块使用缩进来控制，而不是`{}`。例如`if  elif  else`语句：

	```py
	age = input()
	if age < 10:
	    print('child')
	elif age < 60:
	    print('young')
	else:
	    print('old')
	```
	
## 廖雪峰博客笔记

1. 始终在python文件的头两行加上

	```
	字符串和编码 - 廖雪峰的官方网站
	```
	
2. 字符串编码与格式化。

	1. 把str变为bytes `'xxx'.encode('utf-8')`，把bytes变为str `'xxx'.decode('utf-8')`
	2. 格式化：与C语言类似

		```py
		'%2d-%02d' % (3, 1)
		# ' 3-01'
		'float %.3f' % 1.414159
		# 'float 1.414'
		
		常见占位符：
		%d	整数
		%f	浮点数
		%s	字符串
		%x	十六进制整数
		字符中有%要显示则使用%%
		```
	
3. list和tuple：list和tuple是Python内置的有序集合，一个可变，一个不可变（如果tuple中的元素是list或其他对象，则该元素指向不变即可，元素中的内容可变）。根据需要来选择使用它们。因为tuple不可变，所以代码更安全，因此尽可能用tuple代替list。

	```py
	# list/tuple
	list = ['A', 'B', 'C']
	# 根据下标访问属性
	print(
	    list[0], # 'A'
	    # list[3], # error： IndexError: list index out of range
	    list[-1], # 'C'
	    list[-2] # 'B'
	)
	list.insert(1, 'X') # insert()每次只能插入一个元素
	print(list) # ['A', 'X', 'B', 'C']
	
	list.append('D') # append()每次只能增加一个元素
	print(list) # ['A', 'X', 'B', 'C', 'D']
	
	list = ['A', 'B', 'C', 'D']
	list.pop() # 'C'
	list.pop(1) # 'B'
	print(list) # ['A', 'C']
	
	# tuple是不可改变的list
	tuple = () # ()
	tuple = (1) # 1 注意，这里是数值1不是元组
	tuple = (1, ) # (1,)
	```

4. 条件判断： `if  elif else`
5. 循环：
	1. for...in循环，依次把list或tuple中的每个元素迭代出来

		```py
		list = ['A', 'B', 'C']
		for item in list:
		    print(item)
		# A
		# B
		# C
		```
	2. while循环
	
6. 