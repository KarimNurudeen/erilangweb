import { StreamLanguage, HighlightStyle, syntaxHighlighting, StringStream } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { KEYWORDS } from '../utils/syntax';

const KEYWORD_SET = new Set(KEYWORDS);

function token(stream: StringStream) {
  if (stream.match('#')) {
    stream.skipToEnd();
    return 'comment';
  }
  if (stream.match(/^"(?:[^"\\]|\\.)*"/)) return 'string';
  if (stream.match(/^\d+(?:\.\d+)?/)) return 'number';

  const word = stream.match(/^[A-Za-z_][A-Za-z0-9_.]*/);
  if (word) {
    const value = Array.isArray(word) ? word[0] : word;
    if (value === value.toUpperCase() && KEYWORD_SET.has(value)) return 'erikeyword';
    if (/^[A-Z]/.test(value)) return 'eritype';
    if (stream.peek() === '(') return 'erifn';
    return null;
  }

  stream.next();
  return null;
}

export const erilangLanguage = StreamLanguage.define({
  token,
  tokenTable: {
    erikeyword: tags.keyword,
    eritype: tags.typeName,
    erifn: tags.function(tags.variableName),
    comment: tags.comment,
    string: tags.string,
    number: tags.number
  }
});

export const erilangHighlightStyle = HighlightStyle.define([
{ tag: tags.keyword, color: '#2ee6a8' },
{ tag: tags.string, color: '#ffc978' },
{ tag: tags.number, color: '#9db6ff' },
{ tag: tags.comment, color: '#6b7280', fontStyle: 'italic' },
{ tag: tags.typeName, color: '#7fd7ff' },
{ tag: tags.function(tags.variableName), color: '#e6e9ef' }]
);

export const erilangHighlighting = syntaxHighlighting(erilangHighlightStyle);
