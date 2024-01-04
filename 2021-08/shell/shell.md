# shell
## 教程：
1. [Shell脚本编程30分钟入门](https://github.com/qinjx/30min_guides/blob/master/shell.md) 解答了我多年的疑惑，比如如何运行 shell 脚本。 test.sh 不行 ./test.sh 才行
2. [Bash 脚本教程 --阮一峰](https://wangdoc.com/)

## 运行
1. 作为可执行程序
   ```bash
   chmod +x ./test.sh
   ./test.sh
   ```
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

字符串操作：
```bash
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
```

