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


# cd .
# mkdir shell_tut
# cd shell_tut

# for ((i=0; i<10; i++)); do
# 	touch test_$i.txt
# done