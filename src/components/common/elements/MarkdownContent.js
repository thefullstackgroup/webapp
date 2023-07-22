import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from 'next-themes';

const MarkdownContent = ({ content }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <MarkdownPreview
      source={content}
      remarkPlugins={[rehypeHighlight, { detect: true }]}
      wrapperElement={{
        'data-color-mode': currentTheme,
      }}
    />
  );
};

export default MarkdownContent;
