# [webpack](https://juejin.cn/post/7170852747749621791)
> webpack 本质上是一个函数，它接受一个配置信息作为参数，执行后返回一个 compiler 对象，调用 compiler 对象中的 run 方法就会启动编译。run 方法接受一个回调，可以用来查看编译过程中的错误信息或编译信息。

## loader
> 由于浏览器并不认识除 html、js、css 以外的文件格式，所以我们还需要对源文件进行转换 —— Loader 系统。Loader 系统 本质上就是接收资源文件，并对其进行转换，最终输出转换后的文件：
![loader](https://cdn.jsdelivr.net/gh/wangyi1217678365/yi-image-host/d136fc6ee2134316ba2ed5d80e19b243~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## plugin
> 本质上就是一种事件流的机制，到了固定的时间节点就广播特定的事件，用户可以在事件内执行特定的逻辑，类似于生命周期：
![plugin](https://cdn.jsdelivr.net/gh/wangyi1217678365/yi-image-host/19369943abc04a71b970e70b9cbfb434~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 打包过程
1. 读取配置参数
2. 用配置参数对象初始化 Compiler 对象
3. 挂载配置文件中的插件
4. 执行 Compiler 对象的 run 方法开始执行编译
5. 根据配置文件中的 entry 配置项找到所有的入口
6. 从入口文件出发，调用配置的 loader 规则，对各模块进行编译
7. 找出此模块所依赖的模块，再对依赖模块进行编译
8. 等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 chunk
9. 把各个代码块 chunk 转换成一个一个文件加入到输出列表
10. 确定好输出内容之后，根据配置的输出路径和文件名，将文件内容写入到文件系统



## 优化
### 打包速度
#### 优化loader
> 对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，转换代码越多，效率就越低。
优化 Loader 的文件搜索范围
```
  module.exports = {
    module: {
      rules: [
        {
          // js 文件才使用 babel
          test: /\.js$/,
          loader: 'babel-loader',
          // 只在 src 文件夹下查找
          include: [resolve('src')],
          // 不会去查找的路径
          exclude: /node_modules/
        }
      ]
    }
  }
```
对于 Babel 来说，希望只作用在 JS 代码上的，然后 node_modules 中使用的代码都是编译过的，所以完全没有必要再去处理一遍。
当然这样做还不够，还可以将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间
```
  loader: 'babel-loader?cacheDirectory=true'  
```
#### 多线程解析
> 受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

#### 多线程代码压缩
> 在 Webpack3 中，一般使用 UglifyJS 来压缩代码，但是这个是单线程运行的，为了加快效率，可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率。

在 Webpack4 中，不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能。

#### 其它
- resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
- module.noParse：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

### 打包体积