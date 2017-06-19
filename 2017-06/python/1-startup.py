#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 注意：以上两行标识python脚本类型和编码方式的语句只能位于行首


# print 用来输出 
print('hello python!')

# 相等操作符
'42' == 42 # False
'42.0' == 32 # False
42.0 == 42 # True
42.01 == 42 # False

# 比较操作符
True and 2 # 2
False or 2 # 2
(3 < 4) and (5 < 6) # True
(3 < 4) and (5 == 6) # False

# if elif else
# age = input()
# if age < 10:
#     print('child')
# elif age < 60:
#     print('young')
# else:
#     print('old')

# while
a = 0
while a < 5:
    print('index: ' + str(a))
    a = a + 1

# b = input()
# print(b)

# name = ''
# while name != 'your name':
#     print('please enter your name:')
#     name = input()
# print('thank you.')

# 字符串转义，字符串前面加r不转义
print('I\'m "OK"'); # I'm "OK"
print('I\'m \"OK\"'); # I'm "OK"
print(r'I\'m \"OK\"'); # I\'m \"OK\"

# 多行字符串，不需要使用\n，可以使用'''string'''
print('a\nb\nc')
print('''a
b
c''')
# 多行字符串'''...'''中可以继续转义
print('''a
b\n
c''')
# 多行字符串'''...'''还可以在前面加上r使用
print(r'''a
b\n
c''')

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


# 循环
list = ['A', 'B', 'C']
for item in list:
    print(item)
# A
# B
# C

for i in range(5):
    print(i)
# 0
# 1
# 2
# 3
# 4
L = ['Bart', 'Lisa', 'Adam']
for i in L:
    print('Hello, %s!' % i)
# Hello, Bart!
# Hello, Lisa!
# Hello, Adam!


# map/set
map = {'a': 11, 'b': 22, 'A': 'str'}
print(
    map['a'], # 11
    # map['B'] # 访问不存在的键key会出错：KeyError: 'B'，可以使用get()方法，第二个参数指定自定义错误的返回
    map.get('B'), # None
    map.get('B', -1), # -1：自定义错误
    map.get('B', 'error'), # error：自定义错误
)