import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from 'next-themes';
import Markdown from 'markdown-to-jsx';
import MentionsSpan from './MentionsSpan';
import CodeBlock from './CodeBlock';

const MarkdownContent = ({ content }) => {
  // const { systemTheme, theme } = useTheme();
  // const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    // <MarkdownPreview
    //   source={content}
    //   remarkPlugins={[rehypeHighlight, { detect: true }]}
    //   wrapperElement={{
    //     'data-color-mode': currentTheme,
    //   }}

    // />
    <Markdown
      options={{
        overrides: {
          pre: {
            component: CodeBlock,
          },
          span: {
            component: MentionsSpan,
          },
          a: {
            props: {
              className: 'break-all text-left',
              target: '_blank',
            },
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownContent;
