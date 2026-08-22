import React from 'react';
import { tokenize, TokenKind } from '../utils/syntax';

const KIND_CLASS: Record<TokenKind, string> = {
  plain: 'text-[#d5dae3]',
  keyword: 'text-code-key',
  string: 'text-code-str',
  comment: 'text-code-com italic',
  number: 'text-code-num',
  type: 'text-code-type',
  fn: 'text-white'
};

interface CodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ code, showLineNumbers = true, className = '' }: CodeBlockProps) {
  const lineCount = code.split('\n').length;

  return (
    <div className={`flex overflow-x-auto font-mono text-[13.5px] leading-[1.85] ${className}`}>
      {showLineNumbers ?
      <ol
        aria-hidden="true"
        className="mr-5 shrink-0 select-none border-r border-line pr-4 text-right text-[#4b515c]">
        
          {Array.from({ length: lineCount }, (_, i) =>
        <li key={i}>{i + 1}</li>
        )}
        </ol> :
      null}
      <pre className="min-w-0">
        <code>
          {tokenize(code).map((token, i) =>
          <span key={i} className={KIND_CLASS[token.kind]}>
              {token.value}
            </span>
          )}
        </code>
      </pre>
    </div>);

}