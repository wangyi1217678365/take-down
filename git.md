# git
## 概念
- 工作区（Workspace）：开发写代码的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作
- 暂存区（Index）：执行 git add 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 git add 先提交到暂存区。
- 本地仓库（Repository）：更新代码到本地仓库，通过 git commit 提交暂存区的内容，更新到本地仓库
- 远程仓库（Remote）：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 git push 命令同步代码到远程仓库
## 常用指令
```
  git init // 初始化git仓库
  git branch 分支名 // 创建分支
  git checkout 分支名 // 切换本地分支
  git checkout -b 分支名 // 创建分支并切换分支 
  git pull// 从远程获取代码并合并本地的版本
  git add . // 跟踪工作区的文件（暂存区）
  git commit -m '描述' // 将暂存区的内容添加到本地仓库中
  git push // 将本地的分支版本上传到远程并合
```
## 分支基本操作
```
  git branch //查看本地所有分支 
  git branch -r //查看远程所有分支
  git branch -a //查看本地和远程的所有分支
  git branch <branchname> //新建分支
  git branch -d <branchname> //删除本地分支
  git branch -d -r <branchname> //删除远程分支，删除后还需推送到服务器
  git branch -m <oldbranch> <newbranch> //重命名本地分支
```
## 克隆仓库
```
  git clone 仓库地址 // 克隆最新分支或者标签
  git clone -b 指定分支名或标签 仓库地址
  git clone -b 指定分支名或标签 仓库地址 项目名称

```

## 本地项目关联远程仓库
```
  git remote add origin xxx
```
> 应用场景：没有创建远程仓库，在本地创建了一个本地仓库开发，需要关联本地项目至远程仓库
## 标签（git tag）针对某次 commit 的一个标识
```
  git tag // 列出所有标签
  git tag -l [xxx*] // 根据 xxx 进行标签的筛选列表
  git show 标签名 //  查看标签的提交信息
  git log --oneline --graph
  git tag 标签名 // 创建轻量标签
  git tag 标签名 提交版本号 // 给指定的commit版本创建一个轻量标签
  git tag -a 标签名 -m 附注信息 // 创建附注标签
  git tag 标签名 提交版本号 -m 附注信息 // 给指定的commit版本创建一个附注标签
  git tag -d 标签名称 // 删除指定名称的标签
  git push origin 标签名称 // 将指定的标签推送到远程仓库
  git push origin --tags // 将所有不在远程仓库中的标签上传到远程仓库
  git push origin  :regs/tags/标签名称 // 删除远程仓库中的 指定标签
  git push origin --delete 标签名称 // 删除远程仓库中的 指定标签
```
## 缓存没有提交的内容并移出开发环境（git stash）
```
  git stash  // 缓存没有提交的内容并移出开发环境
  git stash save 'message' // 缓存没有提交的内容并移出开发环境，添加描述信息
  git stash list // 查看缓存记录
  git stash pop // 取出最近一次缓存，添加至工作区
  git stash apply 缓存序列号 // 取出指定编号的缓存，添加至工作区
  git stash drop 缓存序列号 // 删除指定缓存
```
> 应用场景：本地开发中，需要缓存工作区，可以通过git stash缓存。1. 需要切换出当前分支。2. 需要将工作区的内容合并至其它分支。
## [回退版本（git reset、git revert）](https://juejin.cn/post/6844903614767448072)
```
  git reset [--soft | --mixed | --hard] [HEAD] 
  git reset --soft [HEAD] // 回退后a分支修改的代码被保留并标记为add的状态（git status 是绿色的状态）
  git reset --mixed [HEAD] // 重置索引，但不重置工作树，更改后的文件标记为未提交（add）的状态。默认操作。
  git reset --hard [HEAD] // 重置索引和工作树，并且a分支修改的所有文件和中间的提交，没提交的代码都被丢弃了。
  git reset --merge [HEAD] // 和--hard类似，只不过如果在执行reset命令之前你有改动一些文件并且未提交，merge会保留你的这些修改，hard则不会。【注：如果你的这些修改add过或commit过，merge和hard都将删除你的提交】。
  git reset --keep [HEAD] // 和--hard类似，执行reset之前改动文件如果是a分支修改了的，会提示你修改了相同的文件，不能合并。如果不是a分支修改的文件，会移除缓存区。git status还是可以看到保持了这些修改。
  // 由于当前分支版本落后于远程仓库最新版本需要强制推送
  git push -f // 将自己本地仓库的代码直接推送至仓库，完全以你的提交为准，之前其他人的提交都会被覆盖。
```
---
```
  git revert [HEAD] // 新增了一个commit记录，用来记录回退操作。
```
## 分支推送（git push）
```
  git push origin 远程分支名 // 创建远程分支 
  git push // 推送到远程关联分支
  git push -f // 强制推送 常用于由于版本回退导致的版本落后 正常的git pull 提交不上去需要强制推送
```
## 代码合并（git merge、git cherry-pick）
```
  git merge 分支名 // 合并两个分支的代码
  git cherry-pick commit记录 // 合并某次commit提交记录到当前分支
```
## 分支更新（git pull、git fetch、git remote update origin --prune）
```
  git pull // 将本地的分支版本上传到远程
  git fetch // 将某个远程仓库的更新全部取回本地，不会进行代码合并，如果远程有删除的分支本地关联分支不会同步删除 主要用来同步新增的远程分支
  git remote update origin --prune // 将某个远程仓库的更新全部取回本地，不会进行代码合并，如果远程有删除的分支本地关联分支会同步删除
```
## 是否忽略文件大小写的变化
```
  git config core.ignorecase true // 忽略
  git config core.ignorecase false // 不忽略
```

## [行尾序列设置](https://juejin.cn/post/7065491626826661896)
CRLF：回车换行
CR：即平常说的\r，回车
LF：即\n，换行
```
  git config --global core.autocrlf  [true | input | false]  // 自动更换CRLF | 自动把/r/n替换成/n | 不对文件内容行尾CRLF做处理
```
