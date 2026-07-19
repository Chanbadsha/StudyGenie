import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const headingStyles: Record<string, string> = {
  h1: 'mb-4 mt-8 text-2xl font-bold text-foreground first:mt-0',
  h2: 'mb-3 mt-6 text-xl font-semibold text-foreground',
  h3: 'mb-2 mt-5 text-lg font-semibold text-foreground',
  h4: 'mb-2 mt-4 text-base font-medium text-foreground',
};

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 className={headingStyles.h1} {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className={headingStyles.h2} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className={headingStyles.h3} {...props}>{children}</h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className={headingStyles.h4} {...props}>{children}</h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-foreground last:mb-0" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1.5 text-foreground last:mb-0" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1.5 text-foreground last:mb-0" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7 text-foreground" {...props}>{children}</li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-foreground" {...props}>{children}</em>
  ),
  code: ({ children, ...props }) => (
    <code className="rounded-md bg-surface px-1.5 py-0.5 text-sm font-mono text-primary" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm last:mb-0" {...props}>{children}</pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="mb-4 border-l-4 border-primary/30 pl-4 italic text-muted last:mb-0" {...props}>{children}</blockquote>
  ),
  hr: (props) => (
    <hr className="mb-4 mt-6 border-border" {...props} />
  ),
  a: ({ children, href, ...props }) => (
    <a href={href} className="text-primary underline underline-offset-2 hover:text-primary-dark" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  ),
  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto last:mb-0">
      <table className="w-full border-collapse text-sm text-foreground" {...props}>{children}</table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-border bg-surface px-3 py-2 text-left font-semibold" {...props}>{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border px-3 py-2" {...props}>{children}</td>
  ),
};

function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <article className={`${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}

export { MarkdownRenderer };
export type { MarkdownRendererProps };
