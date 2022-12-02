import parse5 from 'parse5'
import htmlparser2 from 'parse5-htmlparser2-tree-adapter'

export function parse (content: string) {
  const tree = parse5.parse(content, {
    treeAdapter: htmlparser2.adapter
  })
  return tree
}
