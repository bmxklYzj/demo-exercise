# shell
## 教程：
1. [Shell脚本编程30分钟入门](https://github.com/qinjx/30min_guides/blob/master/shell.md) 解答了我多年的疑惑，比如如何运行 shell 脚本。 test.sh 不行 ./test.sh 才行
2. [Bash 脚本教程 --阮一峰](https://wangdoc.com/bash/)

## 运行
1. 作为可执行程序
   ```bash
   chmod +x ./test.sh
   ./test.sh
   ```
   文件的第一行需要有 Shebang。
   ```bash
   #!/bin/sh
   #!/bin/bash
   #!/usr/bin/env bash
   ```
   以上三种写法都可。`#!/usr/bin/env NAME`这个语法的意思是，让 Shell 查找$PATH环境变量里面第一个匹配的NAME。如果你不知道某个命令的具体路径，或者希望兼容其他用户的机器，这样的写法就很有用。如 Node.js 脚本可以写成`#!/usr/bin/env node`
2. 作为解释器的参数运行
    ```bash
    sh ./test.sh
    ```

## 变量
```bash
# 定义变量
name="hello" # 注意=号前后不能有空格
echo $name
echo ${name} # 变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，最佳实践是总是给变量加上花括号

# 除了显式地直接赋值，还可以用语句给变量赋值，如：
file=`ls -l .`
echo ${file}

file2=$(ls -l .)
echo ${file2}

# 变量重新赋值
name="world"
echo ${name}

# 删除变量
unset name
echo ${name}
```

注意：shell中 ` `` ` 、`$()` 、`${}` 这三个符号的区别
`$( )`与` `` `（反引号）都是用来作命令替换的（大白话就是命令的拼接）。
命令替换与变量替换差不多，都是用来重组命令行的，先完成引号里的命令行，然后将其结果替换出来，再重组成新的命令行。

```sh
# 下面两种写法等价的。单推荐用$()，因为｀｀很容易与''搞混乱，尤其对初学者来说，而$( )比较直观。
echo today is $(date "+%Y-%m-%d")
echo today is `date "+%Y-%m-%d"`

# ${}则是用来分隔变量的
A=hello
echo $AB # 输出空，因为 变量 AB 不存在
echo ${A}B # helloB
```

### 变量的默认值
Bash 提供四个特殊语法，跟变量的默认值有关，目的是保证变量不为空。
```
${val:-word} # val存在且不为空，返回val，否则返回word
${val:=word} # val存在且不为空，返回val，否则将word赋值给val并返回word
${val:+word} # val存在且不为空，返回word，否则返回空值，目的是测试变量是否存在，比如${count:+1}表示变量count存在时返回1
${val:?message} # val存在且不为空，返回val，否则打印出message错误信息，message不传则打印默认信息
```

## 字符串
1. 单引号：
   - 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
   - 单引号字串中不能出现单引号（对单引号使用转义符后也不行）
2. 双引号
    - 双引号里可以有变量
    - 双引号里可以出现转义字符

```bash
name="bmxkl"
# str1='Hello, \'${name}\'' # 报错：
str1='Hello, \"${name}\"'
echo ${str1} # 输出：Hello, \"${name}\"
str2="Hello, \"${name}\""
echo ${str2} # 输出：Hello, "bmxkl"
```

### 字符串操作：
```bash
# 拼接字符串
name="bmxkl"
str1="Hello, "$name" !"
str2="Hello, "${name}" !"
echo ${str1} ${str2} # 输出：Hello, bmxkl ! Hello, bmxkl !

# 获取字符串长度
echo ${#name} # 输出：5

# 提取子字符串 ${varname:offset:length}
str="hello world"
echo ${str:3:5} # 两个参数分别是 起始位置，截断长度。输出：lo wo
```

### 搜索和替换
```bash
# 任意位置的模式匹配。
# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配
${variable/pattern/string}

# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换
${variable//pattern/string}

# 模式必须出现在字符串的开头
${variable/#pattern/string}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable#pattern}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable##pattern}

# 模式必须出现在字符串的结尾
${variable/%pattern/string}
```
```bash
# 1. 字符串头部的模式匹配
myPath=/home/cam/book/long.file.name
echo ${myPath#/*/} # cam/book/long.file.name
echo ${myPath##/*/} # long.file.name
# 替换
echo ${myPath/#*\//test_} # test_long.file.name
```


## echo
```bash
# 下面的效果一样，都输出：hello world
echo hello world
echo "hello world"
echo 'hello world'

# 输出多行
echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"

# -n 参数：默认换行，加上 -n 不换行
# 输出：
# a
# b
echo a;echo b;
# 输出
# ab
echo -n a;echo b

# -e 参数：特殊字符默认原样输出，加上后会转义
# hello\nworld
echo "hello\nworld";
# hello
# world
echo -e "hello\nworld";

# 用空格分隔参数，如果参数之间有多个空格，Bash 会自动忽略多余的空格。
echo this is a    test; # this is a test

# ;是命令的结束符，使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。
cat notexist.txt; echo hello; # 输出hello
# 命令的组合符&&和||
# && 前一个命令成功才执行后一个命令
cat notexist.txt && echo hello; # 不输出hello
# || 前一个命令失败才执行后一个命令
cat notexist.txt || echo hello; # 不输出hello
pwd || echo hello; # 不输出hello

# type： Bash 本身内置了很多命令，同时也可以执行外部程序。怎么知道一个命令是内置命令，还是外部程序呢？
type ls # ls is /bin/ls     说明 ls 是外部程序
type echo # echo is a shell builtin 说明 type 是内置命令
```

## 扩展
```bash
# 输出：
# 4
# 3
# 2
# 1
for i in {4..1}
do
  echo $i
done

# 输出：2007-1 2007-2 2007-3 2007-4 2007-5 2007-6 2007-7 2007-8 2007-9 2007-10 2007-11 2007-12 2008-1 2008-2 2008-3 2008-4 2008-5 2008-6 2008-7 2008-8 2008-9 2008-10 2008-11 2008-12 2009-1 2009-2 2009-3 2009-4 2009-5 2009-6 2009-7 2009-8 2009-9 2009-10 2009-11 2009-12
echo {2007..2009}-{01..12}
```

## 转义
```bash
echo $date # 输出空，因为$date 是个未定义的变量
echo \$date # 输出：$date
echo "a\tb"
echo -e "a\tb"

# 一行命令写成多行
# 换行符是一个特殊字符，表示命令的结束，Bash 收到这个字符以后，就会对输入的命令进行解释执行。换行符前面加上反斜杠转义，就使得换行符变成一个普通字符，Bash 会将其当作长度为0的空字符处理，从而可以将一行命令写成多行。
echo hello \
world \
bash \
```


## 6 个特殊变量
```bash

# $? 为上一个命令的退出码，用来判断上一个命令是否执行成功。返回值是0，表示上一个命令执行成功；如果不是零，表示上一个命令执行失败。
cat notexist.txt;
echo $? # 输出： 1

# $$ 当前 shell 的进程 id
echo $$
echo log_$$.txt # log_58566.txt

# $_ 上一个命令的最后一个参数
ls -l /root;
echo $_; # /root

# $0 为当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时）
echo $0; # ./test.sh

# $#表示脚本的参数数量，$@表示脚本的参数值
# 执行：./test.sh a b c 输出为: 3 a b c
echo $# $@;
```

## 算数运算
1. 算术表达式
   如果要读取算术运算的结果，需要在`((...))`前面加上美元符号`$((...))`，使其变成算术表达式，返回算术运算的值。

    ```bash
    echo $((2 + 2)) # 4  +号前后可以有空格，也可以没有
    ```
2. expr 命令
    ```bash
    expr 3 + 2 # 5  注意3 + 2中间要有空格
    ```
4. let 命令：let命令用于将算术运算的结果，赋予一个变量。
    ```bash
    let x=3+3 # 注意：x=3+3 中间不能有空格，=和+前后都不能有空格
    ```
    从上面三个例子也能看出 shell 的语法有多么的怪异，分别是允许空格，必须有空格，不能有空格。令人抓狂啊！

## 操作历史 history 命令
详见： https://wangdoc.com/bash/history
常用的就是
```bash
history # 查看历史命令
history | grep echo # 配合管道符和grep搜索
```

## 脚本
### 参数
`script.sh word1 word2 word3`
脚本文件内部，可以使用特殊变量，引用这些参数。
```
$0：脚本文件名，即script.sh。
$1~$9：对应脚本的第一个参数到第九个参数。
$#：参数的总数。
$@：全部的参数，参数之间使用空格分隔。
$*：全部的参数，参数之间使用变量$IFS值的第一个字符分隔，默认为空格，但是可以自定义。
```

```bash
# 全部参数： 1 2 3 4
# 参数数量： 4
# $0 =  test.sh
# $1 =  1
# $2 =  2
# $3 =  3
echo '全部参数：' $@
echo '参数数量：' $#
echo '$0 = ' $0
echo '$1 = ' $1
echo '$2 = ' $2
echo '$3 = ' $3

# 输入任意数量的参数，利用for循环，可以读取每一个参数。
for i in "$@"; do
      echo $i
done
```

### source
source命令用于执行一个脚本，通常用于重新加载一个配置文件。

```bash
$ source .bashrc
```
source命令最大的特点是在当前 Shell 执行脚本，不像直接执行脚本时，会新建一个子 Shell。所以，source命令执行脚本时，不需要export变量。

```bash
# source_test.sh 文件内容如下
#!/bin/bash
echo $foo

在bash分别执行
foo=1
source source_test.sh
. source_test.sh
输出1
bash source_test.sh
则输出空字符串
```

### 别名 alias
alias命令用来为一个命令指定别名，这样更便于记忆。下面是alias的格式。

`alias NAME=DEFINITION`

## read 命令

read命令的格式如下。
```sh
read [-options] [variable...]
```
上面语法中，options是参数选项，variable是用来保存输入数值的一个或多个变量名。如果没有提供变量名，环境变量 `REPLY` 会包含用户输入的一整行数据。

```sh
echo -n "输出文本 >"
read text
echo "你的输入 ${text}"

echo Please, enter your firstname and lastname
read fn ln
echo "hi $fn $ln"
```
read的参数啊
1. `-t` 超时参数
2. `-p` 提示信息
3. `-s` 用户输入不展示在屏幕
    ```sh
    read -sp "enter you name >" name
    echo "Your name: $name"
    ```
4. ...

## 条件判断

### if 结构
语法
```sh
if commands; then
  commands
[elif commands; then
  commands...]
[else
  commands]
fi
```

if 关键字后面也可以是一条命令，如果命令成功（返回值为0），则判断条件成立
```sh
if echo 'hi'; then echo "hello world";fi;
# hi
# hello world
```

if 后面可以跟任意数量的命令，所有命令都会执行，但只要最后一个命令执行成功（返回值为0），则会执行 then 的部分
```sh
# if 的最后一个命令执行成功
if ls a.txt; ls; then echo "hello world";fi;
# ls: a.txt: No such file or directory
# source_test.sh  test.sh
# hello world

# if 的最后一个命令执行失败
if ls a.txt; ls b.txt; then echo "hello world";fi;
# ls: a.txt: No such file or directory
# ls: b.txt: No such file or directory

if false; true; then echo "hello world";fi; # hello world
```

elif 部分可以有多个
```sh
read -p "input [1~3] >" num
if [ "$num" = "1" ]; then
    echo 1
elif [ "$num" = "2" ]; then
    echo 2
elif [ "$num" = "3" ]; then
    echo 3
else
    echo "invalid"
fi
```

### test 命令

if 的判断条件，一般使用 test 命令，有三种形式
```sh
test expression
[ expression ]
[[ expression ]]
```
expression 是一个表达式，表达式为真，test命令执行成功（返回值为0）；表达式为假，test命令执行失败（返回值为1）。`[`相当于是` test` 的简写
三种形式等价，但最后一种支持正则。
注意：后面两种`[]`和表达式之间必须有空格。

下面三种写法都是判断一个文件是否存在：
```sh
if test -f /etc/hosts; then
    echo 'file exists';
fi;
if [ -f /etc/hosts ]; then
    echo 'file exists';
fi;
if [[ -f /etc/hosts ]]; then
    echo 'file exists';
fi;
```

### 判断表达式
#### 文件判断
```sh
[ -a file ] 如果 file 存在，则为true
[ -e file ] 如果 file 存在，则为true
[ -f file ] 如果 file 存在且是一个普通文件，则为true
[ -d file ] 如果 file 存在并且是一个目录，则为true
[ -r file ]：如果 file 存在并且可读（当前用户有可读权限），则为true。
[ -w file ]：如果 file 存在并且可写（当前用户有可写权限），则为true。
[ -x file ]：如果 file 存在并且可执行（有效用户有执行／搜索权限），则为true。
```

```sh
read -p "input a file: " file;
if [ -e $file ]; then
      if [ -f $file ]; then
            echo "$file is regular file";
      fi
      if [ -d $file ]; then
            echo "$file is directory";
      fi
      if [ -r $file ]; then
            echo "$file is readable";
      fi
      if [ -w $file ]; then
            echo "$file is writable";
      fi
      if [ -x $file ]; then
            echo "$file is exectable";
      fi
else
      echo "$file not exist";
      exit 1
fi
```
**注意：** 上面程序有bug，如果不输入文件直接回车则会输出：

```
input a file:
 is regular file
 is directory
 is readable
 is writable
 is exectable
```
因为如果 `$file` 为空则 `[ -e $file ]` 会变为 `[ -e ]`，会判断为真，返回值为0；而如果`$file` 放在双引号中，`[ -e $file ]` 会变为 `[ -e "" ]`，会判断为假，返回值为1
```sh
[ -e ]
echo $? # 0

[ -e "" ];
echo $? # 1

[ -e xx.sh ]
echo $? # 1
```
正确做法应该是： `if [ -r "$file" ]`
```sh
read -p "input a file: " file;
if [ -e "$file" ]; then
      if [ -f "$file" ]; then
            echo "$file is regular file";
      fi
      if [ -d "$file" ]; then
            echo "$file is directory";
      fi
      if [ -r "$file" ]; then
            echo "$file is readable";
      fi
      if [ -w "$file" ]; then
            echo "$file is writable";
      fi
      if [ -x "$file" ]; then
            echo "$file is exectable";
      fi
else
      echo "$file not exist";
      exit 1
fi
```
直接回车则正确，会输出
```
input a file:
 not exist
```

#### 字符串判断
```sh
[ string ] 如果string不为空（长度大于0），则判断为真
[ -n string ] 如果string不为空（长度大于0），则判断为真，和上面写法等价
[ -z string ] 如果string长度为零，则判断为真
[ str1 = str2 ] str1和str2相同，则判断为真
[ str1 == str2 ] str1和str2相同，则判断为真，等价于 [ str1 = str2 ]
[  str1 '>' str2 ] 如果按照字典顺序str1排在str2后面，则判断为真。>需要引号引起来，它们会被 shell 解释为重定向操作符
[  str1 '<' str2 ] 如果按照字典顺序str1排在str2前面，则判断为真
```
```sh
str=maybe
if [ -z "$str" ]; then
      echo "$str is empty" >&2
elif [ "$str" = "yes" ]; then
      echo "$str = yes"
elif [ "$str" = "no" ]; then
      echo "$str = no"
elif [ "$str" = "maybe" ]; then
      echo "$str = maybe"
fi
```
字符串判断时，变量要放到双引号中，例如`[ -n "$var" ]`否则可能会报参数过多，或者变量为空时，命令会变成`[ -n ]`，表达式为真！这是非预期的。如果放在双引号中会变成 `[ -n "" ]`，表达式为假
```sh
[ -n ]; echo $? # 0
[ -n "" ]; echo $? # 1
str="hello world"; [ -n $str ]; echo $? # [: hello: binary operator expected
```

## 循环

bash支持三种循环：for、while、until
```bash
num=0;
while [ "$num" -lt 10 ]; do
    echo "num=$num"
    num=$(($num+1))
done;

# 循环终止条件为 满足 num >= 10
num=0;
until [ "$num" -gt 10 ]; do
    echo "num=$num"
    num=$(($num+1))
done;
```
until循环与while循环恰好相反，只要不符合判断条件（判断条件失败），就不断循环执行指定的语句。一旦符合判断条件，就退出循环。

for in:
语法：
```sh
for variable in list
do
  commands
done
```
例子：
```sh
for i in word1 word2 word3; do
    echo $i;
done;

for i in *.sh; do
    ls -l $i;
done;
```
for:
语法
```sh
for (( expression1; expression2; expression3 )); do
  commands
done
```
例子：
```sh
for (( i=0; i<5; i=i+1 )); do
  echo $i
done
```
## 函数
