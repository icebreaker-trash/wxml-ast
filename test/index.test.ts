import { parse, render } from '@/index'
import redent from 'redent'
describe('[Default]', () => {
  test('attr-name-with-space-after-000', async () => {
    const nodes = await parse('<tag name ="value"></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name="value"></tag>')
  })

  test('attr-name-with-space-after-000 change attr value', async () => {
    const nodes = await parse('<tag name ="value"></tag>', {
      elementCB: (e) => {
        e.attribs.name = 'value2'
      }
    })
    const str = render(nodes)
    expect(str).toBe('<tag name="value2"></tag>')
  })

  test('attr-name-with-space-after-001', async () => {
    const nodes = await parse('<tag name ></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name></tag>')
  })

  test('attr-name-without-space-000', async () => {
    const nodes = await parse('<tag attr1="value1"attr2="value1"></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag attr1="value1" attr2="value1"></tag>')
  })

  test('attr-name-without-value-000', async () => {
    const nodes = await parse('<tag name></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name></tag>')
  })

  test('attr-name-without-value-001', async () => {
    const nodes = await parse('<view hidden disabled></view>')
    const str = render(nodes)
    expect(str).toBe('<view hidden disabled></view>')
  })

  test('attr-value-with-double-quote-000', async () => {
    const nodes = await parse('<tag name="""></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name "></tag>')
  })

  test('attr-value-with-double-quote-001', async () => {
    const nodes = await parse("<tag name='\"'></tag>")
    const str = render(nodes)
    expect(str).toBe('<tag name="&quot;"></tag>')
  })

  test('attr-value-with-gt-000', async () => {
    const nodes = await parse('<view id=">"></view>')
    const str = render(nodes)
    expect(str).toBe('<view id="&gt;"></view>')
  })

  test('attr-value-with-single-quote-000', async () => {
    const nodes = await parse('<tag name="\'"></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name="&apos;"></tag>')
  })

  test('attr-value-with-slash-000', async () => {
    const nodes = await parse('<tag name=value/></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name="value/"></tag>')
  })

  test('attr-value-with-space-before-000', async () => {
    const nodes = await parse('<tag name= "value"></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name="value"></tag>')
  })

  test('attr-value-without-quote-000', async () => {
    const nodes = await parse('<tag name1=value1 name2=value2></tag>')
    const str = render(nodes)
    expect(str).toBe('<tag name1="value1" name2="value2"></tag>')
  })

  test('comment-node-000', async () => {
    const nodes = await parse('<!-- <this is="a comment" --><text>test</text>')
    const str = render(nodes)
    expect(str).toBe('<!-- <this is="a comment" --><text>test</text>')
  })

  test('comment-node-001', async () => {
    const nodes = await parse('<!-- <this is="a comment" -- -->')
    const str = render(nodes)
    expect(str).toBe('<!-- <this is="a comment" -- -->')
  })

  test('element-node-nested-000', async () => {
    const nodes = await parse(
      redent(`<view class="view-class {{someClass}}">
    <text>{{a <= b ? c : d}}</text>
    <include src="../some-template.wxml" />
  </view>`)
    )
    const str = render(nodes)
    expect(str).toBe(
      '<view class="view-class {{someClass}}">\n    <text>{{a &lt;= b ? c : d}}</text>\n    <include src="../some-template.wxml">\n  </include></view>'
    )
  })

  test('element-node-nested-001', async () => {
    const nodes = await parse(
      redent(`<navigator>
      <primary-button>立即体验</primary-button>
    </navigator>`)
    )
    const str = render(nodes)
    expect(str).toBe(
      '<navigator>\n      <primary-button>&#x7acb;&#x5373;&#x4f53;&#x9a8c;</primary-button>\n    </navigator>'
    )
  })

  test('element-node-self-closing-tag-000', async () => {
    const nodes = await parse(redent('<tag/>'))
    const str = render(nodes)
    expect(str).toBe('<tag></tag>')
  })

  test('element-node-self-closing-tag-001', async () => {
    const nodes = await parse(redent('<tag />'))
    const str = render(nodes)
    expect(str).toBe('<tag></tag>')
  })

  test('inline-wxs-module-000', async () => {
    const nodes = await parse(
      redent(`<wxs module="status">
      function get(index, active) {
        if (index < active) {
          return 'finish';
        } else if (index === active) {
          return 'process';
        }
      
        return 'inactive';
      }
      
      module.exports = get;
      </wxs>`)
    )
    const str = render(nodes)
    expect(str).toBe(
      '<wxs module="status">\n      function get(index, active) {\n        if (index &lt; active) {\n          return &apos;finish&apos;;\n        } else if (index === active) {\n          return &apos;process&apos;;\n        }\n      \n        return &apos;inactive&apos;;\n      }\n      \n      module.exports = get;\n      </wxs>'
    )
  })

  test('opening-tag-with-space-001', async () => {
    const nodes = await parse(
      redent(`<tag
      ></tag>`)
    )
    const str = render(nodes)
    expect(str).toBe('<tag></tag>')
  })

  test('tag-name-with-space-after-000', async () => {
    const nodes = await parse(
      redent(`<tag></tag
      >`)
    )
    const str = render(nodes)
    expect(str).toBe('<tag></tag>')
  })

  test('tag-name-with-space-before-000', async () => {
    const nodes = await parse(redent('< tag></ tag>'))
    const str = render(nodes)
    expect(str).toBe('&lt; tag&gt;')
  })

  test('text-node-000', async () => {
    const nodes = await parse(redent('text content'))
    const str = render(nodes)
    expect(str).toBe('text content')
  })

  test('text-node-001', async () => {
    const nodes = await parse(redent('<>'))
    const str = render(nodes)
    expect(str).toBe('&lt;&gt;')
  })

  test('text-node-002', async () => {
    const nodes = await parse(redent('{a}'))
    const str = render(nodes)
    expect(str).toBe('{a}')
  })

  test('text-note-with-mustache-000', async () => {
    const nodes = await parse(
      redent(`<view class="view-class {{someClass}}">
    <text>{{a<=b?c:d}}</text>
    <include src="../some-template.wxml" />
  </view>`)
    )
    const str = render(nodes)
    expect(str).toBe(
      '<view class="view-class {{someClass}}">\n    <text>{{a&lt;=b?c:d}}</text>\n    <include src="../some-template.wxml">\n  </include></view>'
    )
  })

  test('text-note-with-mustache-001', async () => {
    const nodes = await parse(
      redent(`<view class='view-class {{someClass || "otherClass"}}'>
    <text>{{a<=b?c:d}}</text>
    <include src="../some-template.wxml" />
  </view>`)
    )
    const str = render(nodes)
    expect(str).toBe(
      '<view class="view-class {{someClass || &quot;otherClass&quot;}}">\n    <text>{{a&lt;=b?c:d}}</text>\n    <include src="../some-template.wxml">\n  </include></view>'
    )
  })
})
