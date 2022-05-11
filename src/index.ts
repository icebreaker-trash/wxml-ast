import { Parser } from 'htmlparser2'
import { DomHandler } from 'domhandler'
import rawRender from 'dom-serializer'
import type { DomSerializerOptions } from 'dom-serializer'
import type { ChildNode, DomHandlerOptions, Element, AnyNode } from 'domhandler'
import type { ParserOptions } from 'htmlparser2'
import defu from 'defu'

export * from 'domutils'
// import type {} from 'dom-serializer'
export interface UserDefinedOptions {
  parserOptions?: ParserOptions
  domHandlerOptions?: DomHandlerOptions
  elementCB?: (element: Element) => void
}

export function parse (
  chunk: string,
  options: UserDefinedOptions = {}
): Promise<ChildNode[]> {
  const defaultOptions: UserDefinedOptions = {}
  const opt = defu(options, defaultOptions)
  return new Promise((resolve, reject) => {
    const handler = new DomHandler(
      (error, dom) => {
        if (error) {
          reject(error)
        } else {
          resolve(dom)
        }
      },
      opt.domHandlerOptions,
      opt.elementCB
    )

    const parser = new Parser(handler, opt.parserOptions)
    parser.write(chunk)
    parser.end()
  })
}

export function render (
  node: AnyNode | ArrayLike<AnyNode>,
  options: DomSerializerOptions = {}
) {
  const defaultOptions: DomSerializerOptions = {
    // encodeEntities: false,
    selfClosingTags: false,
    decodeEntities: false
    // encodeEntities: false
  }
  const opt = defu(options, defaultOptions)
  return rawRender(node, opt)
}

export { rawRender }
