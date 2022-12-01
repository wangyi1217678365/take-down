# git
## 概念
- 工作区
- 暂存区
- 本地仓库
- 远程仓库
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
## 本地项目关联远程仓库
```
  git remote add origin xxx
```
> 应用场景：没有创建远程仓库，在本地创建了一个本地仓库开发，需要关联本地项目至远程仓库
## 打标签（git tag）
```

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
```
## 代码合并（git merge、git cherry-pick）
```
  git merge 分支名 // 合并两个分支的代码
  git cherry-pick commit记录 // 合并某次commit提交记录到当前分支
```
## 分支更新（git pull、git fetch、git remote update origin --prune）
```
  git pull // 将本地的分支版本上传到远程并合
  git fetch // 将某个远程仓库的更新全部取回本地，不会进行代码合并，如果远程有删除的分支本地关联分支不会同步删除
  git remote update origin --prune // 将某个远程仓库的更新全部取回本地，不会进行代码合并，如果远程有删除的分支本地关联分支会同步删除
```
## 是否忽略文件大小写的变化
```
  git config core.ignorecase true // 忽略
  git config core.ignorecase false // 不忽略
```
