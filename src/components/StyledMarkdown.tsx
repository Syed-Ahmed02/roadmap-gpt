import Link from 'next/link';
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
      className="prose dark:prose-invert max-w-none space-y-4"
      components={{
        pre: ({ children }) => (
          <pre className="whitespace-pre-wrap break-words bg-gray-100  p-4 rounded-lg">
            {children}
          </pre>
        ),
        p: ({ children }) => (
          <p className="whitespace-pre-line  ">
            {children}
          </p>
        ),
        hr: () => (
          <hr className="border-black dark:border-white my-4" />
        ),
        a: ({ children, href }) => (
          <Link
            href={href!}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            {children}
          </Link>
        ),
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-bold">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm font-bold">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-xs font-bold">{children}</h6>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="list-disc list-inside">{children}</li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
  );
};

export default StyledMarkdown;