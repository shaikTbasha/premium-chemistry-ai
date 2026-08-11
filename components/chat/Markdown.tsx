import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  // Clean and prepare text for KaTeX and Markdown rendering
  const processedContent = content
    .replace(/\\-/g, "-")
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/(\$\$[^$]+\$\$)/g, "\n\n$1\n\n");

  return (
    <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-4 mb-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-semibold text-blue-300 mt-3 mb-1.5">{children}</h4>,
          h5: ({ children }) => <h5 className="text-sm font-semibold text-amber-300 mt-2 mb-1">{children}</h5>,
          p: ({ children }) => <p className="mb-2 leading-relaxed text-slate-300">{children}</p>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          code({ node, inline, className, children, ...props }: any) {
            return (
              <code className={`${className} bg-slate-900 px-1.5 py-0.5 rounded text-xs text-blue-300 font-mono`} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}