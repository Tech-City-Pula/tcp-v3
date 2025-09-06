import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import TurndownService from 'turndown';
import { z } from 'zod';
import { RichTextEditor } from '@/components/rich-text-editor';

const saveToDbInput = z.object({ html: z.string().trim().min(1) });

const saveToDb = createServerFn({ method: 'POST' })
  .validator(saveToDbInput)
  .handler(({ data }) => {
    // Convert TipTap HTML to Markdown
    const turndown = new TurndownService({ headingStyle: 'atx' });
    const markdown = turndown.turndown(data.html);
    // TODO: persist markdown to DB if needed
    return { markdown } as const;
  });

export const Route = createFileRoute('/test')({ component: RouteComponent });

function RouteComponent() {
  const [_markdown, setMarkdown] = useState('');

  return (
    <div className="flex min-h-screen items-start p-6">
      <RichTextEditor
        onSave={async (editor) => {
          // Server conversion/persist (optional UI feedback)
          const html = editor.getHTML();
          const res = await saveToDb({ data: { html } });
          setMarkdown(res.markdown);
        }}
      />
    </div>
  );
}
