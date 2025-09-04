import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { RichTextEditor } from '@/components/rich-text-editor';
import { RichTextOutput } from '@/components/rich-text-output';

const saveToDb = createServerFn()
  // TODO: validate it here
  .handler(async () => {
    // TODO: turn it into markdown here
  });

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RichTextEditor
        onSave={(_editor) => {
          // TODO: get the editor state here
          saveToDb();
        }}
      />
      <RichTextOutput markdown="" />
    </div>
  );
}
