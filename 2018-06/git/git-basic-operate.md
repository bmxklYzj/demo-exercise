# 常用git命令

>说明： <xxx>表示自己的输入

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
查看rep文件状态-一行简单展示： git status -s|--short
查看远程库信息： git remote -v
添加一个新的远程 Git 仓库: git remote add <shortname> <url>

提交：  git add .|<file-name>;git commit -m '<msg>'
添加并提交整合命令(跳过暂存区域直接从工作区提交到本地仓库)： git commit -a -m '<msg>'

查看diff
查看工作区中改动： git diff
查看暂存区中改动： git diff --staged|--cached

提交历史（回到历史）： git log
查看分支合并图： git log --graph
查看历史命令（去未来）： git reflog
HEAD(注意要大写)： `HEAD`指向的版本就是当前版本，上个版本是`HEAD^`，上上个版本`HEAD^^`，网上10个版本`HEAD~10`。
回退到指定版本： git reset --hard <HEAD|commit-hash-id>

[branch](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86)
列出所有分支： git branch
列出当前分支的最后一次提交： git branch -v
查看哪些分支已合并到当前分支： git branch --merged
查看哪些分支未合并到当前分支： git branch --no-merged

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

rebase：在同一个分支上多人开发，后push的同学必须先pull、本地合并、再push，会产生一个merge，比较难看，如何不产生merge，让git提交记录是一条直线呢？就要用 git rebase。后提交的同学先git pull 再 git rebase 再 git push 提交记录就是一条直线了

标签： 一个标签对应一次commit-id只是个别名
查看： git tag
打标签： git tag <tag-name>
删除标签： git tag -d <tag-name>
推送标签到远端仓库： git push origin <tag-name>

让git忽略文件可添加 .gitignore 文件 https://github.com/github/gitignore
如果某个文件命中了 .gitignore 但仍然想要添加： git add -f <file-name>
检查哪个规则命中了： git check-ignore -v <file-name>
```

## git 快捷键配置

git status/commit 这种命令会显得比较长，为了方便输入可以有一些alias。 每个仓库可以配置，全局也可以配置，全局配置文件在 `/Users/<your-user-name>/.gitconfig` 中。当然可以直接修改配置文件，也可以使用类似命令` git config --global alias.st status`修改

附上自己的alias：

```
[alias]
	st = status
	ci = commit
	br = branch
	co = checkout
	lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

![git cheat sheet](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/git-cheat-sheet.png)

reference

1. [git 官网](https://git-scm.com/about/staging-area)

2. [git book](https://git-scm.com/book/zh/v2/)

3. [廖雪峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)
