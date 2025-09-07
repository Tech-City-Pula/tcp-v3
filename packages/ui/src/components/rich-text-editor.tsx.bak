import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { type RefObject, useEffect } from 'react';
import { Button } from './shadcn/button';

type Props = {
  onUpdate?(editor: Editor): void;
  editorRef?: RefObject<Editor | null>;
};

export function RichTextEditor(props: Props) {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
    immediatelyRender: false, // disable ssr
    onUpdate({ editor }) {
      props.onUpdate?.(editor);
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (props.editorRef) {
      props.editorRef.current = editor;
    }

    return () => {
      if (props.editorRef) {
        props.editorRef.current = null;
      }
    };
  }, [editor, props.editorRef]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('bold') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('italic') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('strike') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('code') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          Code
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('blockquote') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant={editor.isActive('codeBlock') ? 'secondary' : 'outline'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          HR
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          BR
        </Button>
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          Clear
        </Button>
      </div>
      <EditorContent className="prose h-64 w-full overflow-auto rounded-md border p-3" editor={editor} />
    </div>
  );
}
