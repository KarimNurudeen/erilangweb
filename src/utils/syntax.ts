export type TokenKind =
'plain' |
'keyword' |
'string' |
'comment' |
'number' |
'type' |
'fn';

export interface Token {
  value: string;
  kind: TokenKind;
}

const KEYWORDS = [
'AND', 'AS', 'ASYNC', 'AWAIT', 'BREAK', 'CALL', 'CASE', 'CATCH', 'CLASS', 'CONST',
'CONTINUE', 'COPY', 'CREATE', 'DATA', 'DEFINE', 'DESCRIBE', 'DO', 'DOWN', 'EACH', 'ELSE',
'END', 'ENUM', 'ERROR', 'EXPORT', 'FALSE', 'FIELDS', 'FILE', 'FILTER', 'FOR', 'FROM',
'IF', 'IMPLEMENTS', 'IN', 'INCLUDE', 'INHERITS', 'INTERFACE', 'INTO', 'LIST', 'LOAD', 'MAP',
'NONE', 'NOT', 'OF', 'OR', 'PRIVATE', 'RAISE', 'READ', 'RETURN', 'SET', 'STATIC',
'STEP', 'THIS', 'TO', 'TRUE', 'TRY', 'UNIQUE_LIST', 'WHEN', 'WHERE', 'WHILE', 'WITH',
'WRITE'];


const PATTERN = new RegExp(
  [
  '(#[^\\n]*)', // comment
  '("(?:[^"\\\\]|\\\\.)*")', // string
  `\\b(${KEYWORDS.join('|')})\\b`, // keyword
  '\\b([A-Z][A-Za-z0-9_]*)\\b', // type (class, interface, and enum names)
  '\\b(\\d+(?:\\.\\d+)?)\\b', // number
  '\\b([a-z_][A-Za-z0-9_.]*)(?=\\()' // function call
  ].join('|'),
  'g'
);

/** Tokenizes an Erilang source snippet for display-only syntax highlighting. */
export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(source)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: source.slice(lastIndex, match.index), kind: 'plain' });
    }

    const [full, comment, str, keyword, type, num, fn] = match;
    let kind: TokenKind = 'plain';
    if (comment) kind = 'comment';else
    if (str) kind = 'string';else
    if (keyword) kind = 'keyword';else
    if (type) kind = 'type';else
    if (num) kind = 'number';else
    if (fn) kind = 'fn';

    tokens.push({ value: full, kind });
    lastIndex = match.index + full.length;
  }

  if (lastIndex < source.length) {
    tokens.push({ value: source.slice(lastIndex), kind: 'plain' });
  }

  return tokens;
}
