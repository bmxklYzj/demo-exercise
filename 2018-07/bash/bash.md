# learn bash

## bash环境

bash 脚本在头部指定运行环境 `#!/bin/bash` ，它指定使用 `/bin/bash`程序来解释源代码

几种运行bash的方式:
- `source` 和 `.` ：在当前shell内去读取执行，文件不需要有执行权限
- `sh` 和 `bash` ：打开一个subshell（隔离容器）读取执行，文件不需要有执行权限
- `./` ：打开一个subshell（隔离容器）读取执行，但文件需要有执行权限（chmod u+x xxx.sh再执行）

在当前shell内去读取执行的意思：执行`source test.sh`那么`$a`变量就会在当前shell环境中出现，`echo $a;`也会打印出`hello bash`

```sh
# test.sh
a="hello bash";
echo $a;
```



## 基础

- 注释： `#`

## 目录操作

- copy 复制

    ```sh
    cp file1 file2
    cp -r dir1 dir2
    ```

- move 移动

    ```sh
    mv file .. # 将file移动到上级目录
    mv file dir/ # 将file移动到当前dir目录
    ```

- rename 重命名

    ```sh
    mv file1 file2
    mv dir1 dir2 # 若dir2已存在，则为移动操作
    ```

- delete 删除

    ```sh
    rm file
    rm -r dir
    ```

- 创建文件

    ```sh
    touch a.txt
    >a.txt
    vi a.txt
    ```

- 创建目录

    ```sh
    mkdir dir
    mkdir dir; cd $_ # 创建并进入
    ```

- 查看文件

    ```sh
    cat a.txt
    ```

    如果文件大，可以采用分页命令 `less a.txt` 常用操作（类似于man命令下的操作）：

    ```
    j   向下翻页
    k   向上翻页
    g   到文件头
    G   到文件尾
    /   搜索
    ```

- 查看文件类型

    ```sh
    file a.txt
    ```

- 通配符

    `*` 0或多个字符

- 压缩

    - zip

        - unzip xx.zip
        - zip -r xx.zip dir

    - tar.gz

        - tar zxvf xx.tar.gz dir      (x: extract)
        - tar zcvf xx.tar.gz dir      (c: compress)

    - tar.br2

        - tar jxvf xx.tar.br2 dir      (x: extract)
        - tar jcvf xx.tar.br2 dir      (c: compress)

- 重定向

    - 文件描述符

        - 0 stdin
        - 1 stdout
        - 2 stderr

    - 输出重定向

        `> out.txt` 等价于 `1> out.txt`

    - 错误输出

        `2> err.txt`

    - 输入

        `< in.txt` 等价于 `0< in.txt`

        例子：

        ```sh
        ls > bin.txt
        grep a < bin.txt
        ```

    - 管道

        前一个命令的输出作为后一个命令的输入

        `ls | uniq | sort | grep a`

- 进程

    显示所有进程 `ps aux`

    配合 `| less` 分页查看

    配合 `grep xxx` 搜索

    杀死进程: `kill -9 pid`

- 查找文件名: `find`

    例子：

    `find . -type f` 查看当前及其子目录下面的所有文件。 `-type d` 指定查找目录

    `find a.txt` 查看当前及其子目录下面的a.txt

- 网络操作

    连接server： ssh 默认端口为`22`
