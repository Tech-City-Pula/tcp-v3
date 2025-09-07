import { cn } from '@repo/ui/utils';
import ReactMarkdown from 'react-markdown';

export function RichTextOutput(props: { markdown: string; className?: string }) {
  return <ReactMarkdown className={cn('prose', props.className)} children={props.markdown} />;
}
