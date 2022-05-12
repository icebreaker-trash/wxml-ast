import { Parser } from 'htmlparser2'
import { DomHandler } from 'domhandler'
import rawRender from 'wxml-dom-serializer'
import defu from 'defu'
import type {
  UserDefinedOptions,
  DomSerializerOptions,
  ChildNode,
  AnyNode
} from './types'

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
    selfClosingTags: true,
    decodeEntities: false
    // encodeEntities: false
  }
  const opt = defu(options, defaultOptions)
  return rawRender(node, opt)
}
