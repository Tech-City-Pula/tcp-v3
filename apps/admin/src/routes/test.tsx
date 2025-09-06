import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { RichTextEditor } from '@repo/ui/components/rich-text-editor';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import TurndownService from 'turndown';
import { z } from 'zod';

const saveToDbInput = z.object({ html: z.string().trim().min(1) });

const turndown = new TurndownService();

const saveToDb = createServerFn({ method: 'POST' })
  .validator(saveToDbInput)
  .handler(async ({ data }) => {
    const markdown = turndown.turndown(data.html);

    const result = await db.insert(schema.blogs).values({
      content: markdown,
      title: 'hello markdown',
    });

    return result;
  });

export const Route = createFileRoute('/test')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-start p-6">
      <RichTextEditor
        onUpdate={async (editor) => {
          const html = editor.getHTML();

          const result = await saveToDb({
            data: {
              html,
            },
          });

          alert(JSON.stringify(result, null, 2));
        }}
      />
    </div>
  );
}
