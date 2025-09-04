export function RichTextOutput(props: { markdown: string }) {
  // TODO: render markdown from db here using the `react-markdown` package
  return <div className="prose">{props.markdown}</div>;
}
