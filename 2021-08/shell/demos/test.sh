#!/bin/bash
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

################################
# 字符串
name="bmxkl"
# str1='Hello, \'${name}\'' # 报错：
str1='Hello, \"${name}\"'
echo ${str1} # 输出：Hello, \"${name}\"
str2="Hello, \"${name}\""
echo ${str2} # 输出：Hello, "bmxkl"

# 拼接字符串
name="bmxkl"
str1="Hello, "$name" !"
str2="Hello, "${name}" !"
echo ${str1} ${str2} # 输出：Hello, bmxkl ! Hello, bmxkl !

# 获取字符串长度
echo ${#name} # 输出：5

# 提取子字符串
str="hello world"
echo ${str:3:5} # 两个参数分别是 起始位置，截断长度。输出：lo wo

# 搜索和替换
echo "搜索和替换"
# 1. 字符串头部的模式匹配
myPath=/home/cam/book/long.file.name
echo ${myPath#/*/} # cam/book/long.file.name
echo ${myPath##/*/} # long.file.name
# 替换
echo ${myPath/#*\//test_} # test_long.file.name

# cd .
# mkdir shell_tut
# cd shell_tut

# for ((i=0; i<10; i++)); do
# 	touch test_$i.txt
# done

# echo
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

# 扩展
for i in {4..1}
do
      echo $i
done

echo {2007..2009}-{01..12}

# 转义
echo $date # 输出空，因为$date 是个未定义的变量
echo \$date # 输出：$date
echo "a\tb"
echo -e "a\tb"

# 一行命令写成多行
# 换行符是一个特殊字符，表示命令的结束，Bash 收到这个字符以后，就会对输入的命令进行解释执行。换行符前面加上反斜杠转义，就使得换行符变成一个普通字符，Bash 会将其当作长度为0的空字符处理，从而可以将一行命令写成多行。
echo hello \
world \
bash \

# 特殊变量
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

# $- 为当前 Shell 的启动参数。
echo $-;

# $#表示脚本的参数数量，$@表示脚本的参数值
# 执行：./test.sh a b c 输出为: 3 a b c
echo $# $@;

echo "#################################"
# -p参数输出变量信息。
# declare -p
# -F参数输出当前环境的所有函数名，不包含函数定义。
# declare -F

# 脚本

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

echo "参数数量$#个"
while [ "$1" != "" ]; do
      echo "剩下 $# 个参数"
      echo "参数 $1"
      shift
done

################ read
# echo -n "输出文本 >"
# read text
# echo "你的输入 ${text}"

# echo Please, enter your firstname and lastname
# read fn ln
# echo "hi $fn $ln"

# echo -n "输出文本 >"
# if read -t 3 reponse; then
#       echo "用户已输入"
# else
#       echo "用户没有输入"
# fi

# TMOUT=3
# read response

# read -sp "enter you name >" name
# echo "Your name: $name"

################ if
if test $USER = "foo"; then
    echo "hello foo"
else
    echo "your name are not foo."
fi


if true
then
    echo "hello world"
fi

if false
then
    echo "it is false"
fi

if true; then echo "hello world";fi;

if echo 'hi'; then echo "hello world";fi;

if false; true; then echo "hello world";fi;

if ls a.txt; ls; then echo "hello world";fi;
# ls: a.txt: No such file or directory
# source_test.sh  test.sh
# hello world
if ls a.txt; ls b.txt; then echo "hello world";fi;
# ls: a.txt: No such file or directory
# ls: b.txt: No such file or directory

# read -p "input [1~3] >" num
# if [ "$num" = "1" ]; then
#     echo 1
# elif [ "$num" = "2" ]; then
#     echo 2
# elif [ "$num" = "3" ]; then
#     echo 3
# else
#     echo "invalid"
# fi

test -f /etc/hosts
echo $?

if test -f /etc/hosts; then
    echo 'file exists';
fi;
if [ -f /etc/hosts ]; then
    echo 'file exists';
fi;
if [[ -f /etc/hosts ]]; then
    echo 'file exists';
fi;

# 文件判断
# read -p "input a file: " file;
# if [ -e "$file" ]; then
#       if [ -f "$file" ]; then
#             echo "$file is regular file";
#       fi
#       if [ -d "$file" ]; then
#             echo "$file is directory";
#       fi
#       if [ -r "$file" ]; then
#             echo "$file is readable";
#       fi
#       if [ -w "$file" ]; then
#             echo "$file is writable";
#       fi
#       if [ -x "$file" ]; then
#             echo "$file is exectable";
#       fi
# else
#       echo "$file not exist";
#       exit 1
# fi

# 字符串判断
str=hello
str2=helao
str3=hello

if [ "$str" ];then
      echo "$str 不为空"
else
      echo "$str 为空"
fi
if [ -n "$str" ];then
      echo "$str 不为空"
else
      echo "$str 为空"
fi
if [ -z "$str" ];then
      echo "$str 为空"
else
      echo "$str 不为空"
fi
if [ "$str" '>' "$st2" ];then
      echo "$str > $str2"
else
      echo "$str < $str2"
fi
if [ "$str" = "$st2" ];then
      echo "$str = $str2"
else
      echo "$str != $str2"
fi
if [ "$str" == "$str3" ];then
      echo "$str == $str3"
else
      echo "$str != $str3"
fi

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

[ -n ]; echo $? # 0
[ -n "" ]; echo $? # 1
str="hello world"; [ -n $str ]; echo $? # [: hello: binary operator expected

# 循环
# 循环终止条件为 不满足 num <= 10
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

for i in word1 word2 word3; do
    echo $i;
done;

for i in *.sh; do
    ls -l $i;
done;

# count=0;
# for i in $(cat ~/.zshrc); do
#     count=$((count+1))
#     echo "word $count $i contains $(echo -n $i | wc -c) characters"
# done;

for (( i=0; i<5; i=i+1 )); do
  echo $i
done

# 函数
function hello() {
  echo "Hello $1"
}
hello world
# Hello world

func1() {
  echo "\$@: $@";
  echo "\$0 \$1 \$2 \$3: $0 $1 $2 $3"
  echo "\$#: $#";
}
func1 param1 param2
# $@: param1 param2
# $0 $1 $2 $3: ./test.sh param1 param2 
# $#: 2

declare -f
declare -F

# 函数体内声明全局变量
func1() {
  echo $foo1
  foo1=2
  echo $foo1
}
func1
echo "函数外：$foo1"
# 
# 2
# 函数外：2

# 函数体内修改全局变量
foo2=1
func2() {
  echo $foo2
  foo2=2
  echo $foo2
}
func2
echo "函数外：$foo2"
# 1
# 2
# 函数外：2

# 函数体内使用 local 声明局部变量
func3() {
  local foo3=3
  echo $foo3
}
func3
echo "函数外：$foo3"
# 3
# 函数外：

#########数组#########
array[0]=1
array[1]=2
array[2]=3
array1=(4 5 6)
array2=(
  7
  8
  9
)
array3=(*.sh)

# 读取
echo ${array[0]} # 1
echo $array[0] # 1[0]

echo ${array[@]} # 1 2 3
echo ${array1[@]} # 4 5 6
echo ${array2[@]} # 7 8 9
echo ${array3[@]} # source_test.sh test.sh

# 数组在赋值或者访问时如果直接 使用数组名则访问的是下标1元素
array4=(1 2 3)
array4=4
echo $array4 #  4
echo ${array4[@]} # 4 2 3

# 数组长度
echo ${#array4[@]} # 3

# 遍历数组
for i in "${array[@]}"; do
  echo $i;
done;

src_arr=(1 2 3)
# 复制数组
src_copy=( "${src_arr[@]}" )
echo ${src_copy[@]}
# 给数组追加元素 的2种方式
src_arr=( "${src_arr[@]}" 4 )
echo ${src_arr[@]}
src_arr+=(5 6)
echo ${src_arr[@]}