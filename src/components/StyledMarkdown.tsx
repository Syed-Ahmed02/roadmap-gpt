import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface StyledMarkdownProps {
  content: string;
}

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => (
          <pre className="whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            {children}
          </pre>
        ),
        p: ({ children }) => (
          <p className="whitespace-pre-line text-black dark:text-white">
            {children}
          </p>
        ),
        hr: () => (
          <hr className="border-black dark:border-white my-4" />
        ),
        a: ({ children, href }) => (
          <a 
            href={href}
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            {children}
          </a>
        )
        
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
  );
};

export default StyledMarkdown;