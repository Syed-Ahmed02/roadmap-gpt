import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface StyledMarkdownProps {
  content: string
}

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({ content }) => {
  return (
    <div className="prose prose-base dark:prose-invert max-w-none leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-black dark:text-primary-foreground my-4 whitespace-pre-line">
              {children}
            </p>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-900 text-sm rounded-lg p-4 my-4">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="bg-muted dark:bg-muted/50 text-pink-600 dark:text-pink-400 px-1 py-0.5 rounded">
              {children}
            </code>
          ),
          hr: () => (
            <hr className="border-t border-muted my-6 dark:border-white/20" />
          ),
          a: ({ children, href }) => (
            <Link
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            >
              {children}
            </Link>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 text-black dark:text-primary-foreground">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-300 my-4">
              {children}
            </blockquote>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default StyledMarkdown
