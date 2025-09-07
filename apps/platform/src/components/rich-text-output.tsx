import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function RichTextOutput(props: { markdown: string; className?: string }) {
  return <ReactMarkdown className={cn('prose', props.className)} children={props.markdown} />;
}
