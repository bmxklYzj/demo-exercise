#!/usr/bin/env python3

####################### input output ###########################
# name = input("input your name:")
# print('hello', name)

####################### 字符串 ###########################
ord('A')
# 65
ord('中')
# 20013
chr(65)
# 'A'
chr(20013)
# '中'
'ABC'.encode('ascii')
# b'ABC'
# '中文'.encode('ascii') # 报错
'中文'.encode('utf-8')
# b'\xe4\xb8\xad\xe6\x96\x87'
b'ABC'.decode('ascii')
# 'ABC'
b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
# '中文'
'hello, %s' % 'world'
# 'hello, world'

s1 = 72
s2 = 85
r = (s2 - s1) / s1 * 100
print('improve percent: %2.1f%%' % r)

####################### List 和 Tuple ###########################
lists = ['A', 'B', 'C']
# 下标访问
lists[0]
# 'A'
lists[-1]
# 'C'
len(lists)
# 3
# 方法：append/pop/insert

tubles = ('A', 'B', 'C')

####################### 条件判断 ###########################
age = 3
if age >= 18:
    print('adult')
else:
    print('teenager')

####################### 循环 ###########################
L = ['Bart', 'Lisa', 'Adam']
for item in L:
    print('hello: %s' % item)

####################### dict 和 set ###########################
# >>> d = {'A': 1, 'B': 2, 'C': 3}
# >>> d
# {'A': 1, 'B': 2, 'C': 3}
# >>> d['A']
# 1
# >>> d['D']
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# KeyError: 'D'
# >>> d.get('A')
# 1
# >>> d.get('D')
# >>> d.get('D', 0)
# 0
# >>> d.pop('B')
# 2
# >>> d
# {'A': 1, 'C': 3}
# >>> 

# >>> s = {2,1,3}
# >>> s
# {1, 2, 3}
# >>> s.add(0)
# >>> s
# {0, 1, 2, 3}
# >>> s.remove(2)
# >>> s
# {0, 1, 3}

####################### 函数 ###########################
def my_abs(v):
    if v >= 0:
        return v;
    else:
        return -v;

####################### 切片 ###########################
# >>> l = ['A', 'B', 'C', 'D']
# >>> l[:2]
# ['A', 'B']
# >>> l[:4:2] # 每两个取一个
# ['A', 'C']
# >>> l[:4]
# ['A', 'B', 'C', 'D']

# 字符串切片
# >>> 'ABCDEFG'[::2]
# 'ACEG'

####################### 迭代 ###########################
d = {'a': 1, 'b': 2, 'c': 3}
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
    print(key)
for value in d.values():
    print(value)
for k,v in d.items():
    print(k, v)

# 迭代字符串
for i in 'ABC':
    print(i)

from collections.abc import Iterable
print(isinstance('abc', Iterable)) # True
print(isinstance([1,2,3], Iterable)) # True
print(isinstance(123, Iterable)) # False

# 下标
for i, value in enumerate(['a', 'b', 'c']):
    print(i, value)
# 0 a
# 1 b
# 2 c

####################### 列表生成式 ###########################
# >>> list(range(1,5))
# [1, 2, 3, 4]

L1 = ['Hello', 'World', 18, 'Apple', None]
L2 = [s.lower() for s in L1 if isinstance(s, str)]

# 测试:
print(L2)
if L2 == ['hello', 'world', 'apple']:
    print('测试通过!')
else:
    print('测试失败!')


def normalize(name):
    return name[0].upper() + name[1:]

# 测试:
L1 = ['adam', 'LISA', 'barT']
L2 = list(map(normalize, L1))
print(L2)

####################### 高阶函数 ###########################
L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]

def by_name(t):
    name, score = t
    return score

L2 = sorted(L, key=lambda t: -t[1])
print(L2)

