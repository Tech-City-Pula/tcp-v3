import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';

type Props = {
  onSave(editor: Editor): void;
};

export function RichTextEditor(props: Props) {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
    immediatelyRender: false, // disable ssr
  });

  if (!editor) {
    return null;
  }

  function handleSave() {
    if (!editor) {
      return;
    }

    props.onSave(editor);
  }

  return (
    <div>
      <EditorContent className="prose flex border" editor={editor} />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
