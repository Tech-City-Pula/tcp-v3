import ReactMarkdown from 'react-markdown';

export function RichTextOutput(props: { markdown: string }) {
  return <ReactMarkdown className="prose" children={props.markdown} />;
}
