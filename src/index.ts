import { createToken, Lexer } from 'chevrotain'

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ })
// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
const Select = createToken({
  name: 'Select',
  pattern: /SELECT/,
  longer_alt: Identifier
})
const From = createToken({
  name: 'From',
  pattern: /FROM/,
  longer_alt: Identifier
})
const Where = createToken({
  name: 'Where',
  pattern: /WHERE/,
  longer_alt: Identifier
})

const Comma = createToken({ name: 'Comma', pattern: /,/ })

const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ })

const GreaterThan = createToken({ name: 'GreaterThan', pattern: />/ })

const LessThan = createToken({ name: 'LessThan', pattern: /</ })

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
})

const allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Comma,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  GreaterThan,
  LessThan
]

const SelectLexer = new Lexer(allTokens)
const inputText = 'SELECT column1 FROM table2'
const lexingResult = SelectLexer.tokenize(inputText)

console.log(lexingResult)
