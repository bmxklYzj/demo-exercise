# 常用git命令

## git简介

git是分布式版本控制系统，svn使用集中式版本控制系统

git存放代码有四个概念：

* 工作区
* 暂存区
* 本地仓库
* 远端仓库

![git rep](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/git.png)

暂存区存在的意义在于允许我们只提交部分已修改的文件到本地仓库中。
用`git add <filename>`添加部分文件。用`git add .`添加全部修改到本地仓库中。

## 常用命令：

```
创建空仓库： git init
从已有仓库clone： git clone
拉取： git pull
查看rep文件状态： git status
查看远程库信息： git remote -v

提交历史（回到历史）： git log
查看分支合并图： git log --graph
查看历史命令（去未来）： git reflog
HEAD(注意要大写)： `HEAD`指向的版本就是当前版本，上个版本是`HEAD^`，上上个版本`HEAD^^`，网上10个版本`HEAD~10`。
回退到指定版本： git reset --hard <HEAD|commit-hash-id>

列出所有分支： git branch
创建分支： git branch <branch-name>
切换分支： git checkout <branch-name>
创建并切换分支： git chekcout -b <branch-name>
删除分支： git chekcout -d <branch-name>
丢弃修改： git chekcout -- <filename>

合并某分支到当前分支： git merge <branch-name>
合并分支并且不采用fast forward模式，保留分支合并信息： git merge --no-ff -m '<merge-msg>' <branch-name>

暂存stash： git stash 等同于 git stash save
暂存并命名： git stash save <msg>
查看所有暂存： git stash list
把暂存放到工作区但不删除： git stash apply
把暂存放到工作区并不删除： git stash pop (apply和pop可以指定某一次暂存 stash@{0}等价于0 ，stash@{1}等价于1)


```


reference

1. [git 官网](https://git-scm.com/about/staging-area)

2. [廖雪峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)
