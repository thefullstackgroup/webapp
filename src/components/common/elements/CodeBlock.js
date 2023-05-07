import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Block = ({ className, children }) => {
  let lang = 'text'; // default monospaced text
  if (className && className.startsWith('lang-')) {
    lang = className.replace('lang-', '');
  }
  return (
    <SyntaxHighlighter language={lang} style={dracula}>
      {children}
    </SyntaxHighlighter>
  );
};

const CodeBlock = ({ children, ...rest }) => {
  if ('type' in children && children['type'] === 'code') {
    return Block(children['props']);
  }
  return <pre {...rest}>{children}</pre>;
};

export default CodeBlock;
