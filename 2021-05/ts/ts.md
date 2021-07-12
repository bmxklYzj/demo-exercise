# ts

> As a principle, TypeScript **never** changes the runtime behavior of JavaScript code. -react不会改变js运行时行为
>
> This means that if you move code from JavaScript to TypeScript, it is **guaranteed** to run the same way, even if TypeScript thinks that the code has type errors.
>
> Roughly speaking, once TypeScript’s compiler is done with checking your code, it *erases* the types to produce the resulting “compiled” code. This means that once your code is compiled, the resulting plain JS code has no type information. -- ts编译成js会丢弃类型信息
>
> **TypeScript is JavaScript’s runtime with a compile-time type checker**. -- ts = js运行时 + 编译期类型检查
>
> The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs. -- ts的优势在于能提示类型错误，减少bug



js primitive types： `boolean`, `bigint`, `null`, `number`, `string`, `symbol`, and `undefined`

ts extends above：`any` (allow anything), [`unknown`](https://www.typescriptlang.org/play#example/unknown-and-never) (ensure someone using this type declares what the type is), [`never`](https://www.typescriptlang.org/play#example/unknown-and-never) (it’s not possible that this type could happen), and `void` (a function which returns `undefined` or has no return value)

