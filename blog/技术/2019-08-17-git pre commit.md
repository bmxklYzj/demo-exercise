# git hook

之前给我的博客写了个脚本，每次添加了新文章后执行一个shell即可更新目录，不用手动维护目录，更方便了些。但是经常可能又忘了去执行这个shell。于是想借助git hook来做，每次commit代码自动执行shell更新目录。

在前端工程化中很重要的一项就是代码风格检查。平时我们开发使用esLint这样的工具，在代码提交环节需要有校验（本地 or 云端），否则代码无法提交入库。

在git操作的多个流程中会有一些钩子，这些钩子在每个git仓库的 .git/hook 目录下，默认是 .sample 结尾不会执行，如果你想要添加自定义操作只需要修改文件并去掉 .sample 后缀即可。这些文件可以是任意可执行文件，在行首加上shebang。

git hook分为local和remote两种。local类型的脚本都存在 .git/hook 文件夹下面，他们可以被开发者修改或者绕过（添加 --no-verify ），所以local hook只能作为guide，不能作为policy。

>pre- hooks let you alter the action that’s about to take place, while the post- hooks are used only for notifications.

local hook还有一个不方便的地方：它存在于 .git/hooks 中，但默认是不被git追踪的，这给团队协作带来困难，总不能 copy/paste 吧。于是乎可以把 hooks放到项目目录添加到git追踪中，然后软连/copy到 .git/hooks 目录中。

常用的local hook：

- pre-commit：每次用户输入git commit命令后，生成commit msg之前。可用来跑单测、lint。
- prepare-commit-msg：pre-commit、自动生成的commit msg之后。可用来规范commit msg。
- commit-msg：用户输入commit并保存后。可用来再次校验commit是否符合团队规范。
- post-commit：commit-msg后立即执行。
- post-checkout：切换分支后。可用来清除某些生成或冲突的文件
- pre-rebase

常用的server hook：

- pre-receive：每次收到user使用git push命令push代码到远端仓库，入库前执行。由于local hook可绕过，所以此hook可用来强制校验commit msg、code style等，不合法则reject，无法入库
- update：同pre-receive，只是每个push的分支都会执行。
- post-receive：代码成功入库。可用来send mail，ci等。




reference: [git hook](https://www.atlassian.com/git/tutorials/git-hooksf)