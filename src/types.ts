import type { DomSerializerOptions } from 'wxml-dom-serializer'
import type { ChildNode, DomHandlerOptions, Element, AnyNode } from 'domhandler'
import type { ParserOptions } from 'htmlparser2'
export interface UserDefinedOptions {
  parserOptions?: ParserOptions
  domHandlerOptions?: DomHandlerOptions
  elementCB?: (element: Element) => void
}
export { DomSerializerOptions, ChildNode, AnyNode }
