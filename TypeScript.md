# [TypeScript](https://ts.xcatliu.com/introduction/what-is-typescript.html)
> 添加了类型系统的 JavaScript，适用于任何规模的项目。由于 js 没有类型约束 语言的灵活性，代码质量参差不齐，维护成本高，运行时错误多。
- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。

## 原始数据
### 布尔
```
  let isDone: boolean = false;
  let createdByNewBoolean: boolean = new Boolean(1); // 注意，使用构造函数 Boolean 创造的对象不是布尔值，报错
  let createdByNewBoolean: Boolean = new Boolean(1);
  let createdByBoolean: boolean = Boolean(1);
```
### 数值
```
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
  // ES6 中的二进制表示法
  let binaryLiteral: number = 0b1010;
  // ES6 中的八进制表示法
  let octalLiteral: number = 0o744;
  let notANumber: number = NaN;
  let infinityNumber: number = Infinity;
  // 其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字。
```
### 字符串
```
  let myName: string = 'Tom';
  let myAge: number = 25;

  // 模板字符串
  let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} `;
```
### 空值
```
  // JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
  function alertName(): void {
    alert('My name is Tom');
  }
  let unusable: void = undefined;
```
### null 和 undefined
```
  let u: undefined = undefined;
  let n: null = null;
  // 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
  // 这样不会报错
  let num: number = undefined;
  // 而 void 类型的变量不能赋值给 number 类型的变量：
  let u: void;
  let num: number = u;
```


## 数组

## 函数

## 任意值

## 联合类型

## 函数类型


## 对象--接口