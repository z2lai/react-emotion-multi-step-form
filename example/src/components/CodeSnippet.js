import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const preTagStyle = {
  margin: 'auto',
  maxWidth: '980px',
  padding: '20px 15px',
  overflow: 'hidden',
}

const codeTagProps = {
  style: {
    display: 'block',
    overflow: 'auto',
  }
}

const CodeSnippet = ({ children, language }) => (
  <SyntaxHighlighter
    // showLineNumbers={true}
    // startingLineNumber={0}
    // lineNumberStyle={{ color: '#ddd', fontSize: 20 }}
    language={language}
    style={dracula}
    customStyle={preTagStyle}
    codeTagProps={codeTagProps}
  >
    {children.trim()}
  </SyntaxHighlighter>
)

export default CodeSnippet;
