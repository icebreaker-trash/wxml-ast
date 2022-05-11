# wxml-ast

## Introduction

解析 `wxml` 并进行操纵和渲染

## APIs

### `parse`

解析 `wxml` 并返回 `wxml-ast`

`wxml-ast` 可使用 [domutils](https://domutils.js.org/modules.html) 进行操纵(已内置在此 `lib` 中)

#### Parameters:

| Name      | Type                 | Default value | Description    |
| :-------- | :------------------- | :------------ | :------------- |
| `chunk`   | `string`             | -             | `wxml` 字符串  |
| `options` | `UserDefinedOptions` | {}            | 改变序列化行为 |

##### `UserDefinedOptions`

```ts
export interface UserDefinedOptions {
  // https://github.com/fb55/htmlparser2
  parserOptions?: ParserOptions
  // https://github.com/fb55/domhandler
  domHandlerOptions?: DomHandlerOptions
  elementCB?: (element: Element) => void
}
```

### `render`

根据 `wxml-ast` 渲染 `wxml`
#### Parameters:

| Name      | Type                                                                                        | Default value | Description          |
| :-------- | :------------------------------------------------------------------------------------------ | :------------ | :------------------- |
| `node`    | `Node` \| `Node[]`                                                                          | -             | 节点需要被渲染的节点 |
| `options` | [`DomSerializerOptions`](https://github.com/cheeriojs/dom-serializer/blob/master/README.md) | {}            | 改变序列化行为       |

### `export * from 'domutils'`

从 `domutils` 导出的操纵 `ast` 方法

[文档](https://domutils.js.org/modules.html)