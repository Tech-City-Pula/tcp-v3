import { RichTextEditor } from '@repo/ui/components/rich-text-editor';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Input } from '@repo/ui/components/shadcn/input';
import { Label } from '@repo/ui/components/shadcn/label';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import type { Editor } from '@tiptap/react';
import { type FormEventHandler, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type z from 'zod';
import { ZodError } from 'zod';
import { contentSchema, createBlogFormSchema, titleSchema } from '@/lib/validation/blogs';
import { createBlog } from '@/server/blogs';

const defaultBlog: z.infer<typeof createBlogFormSchema> = {
  title: '',
  content: '',
} as const;

export type BlogFormProps = {
  onCreated?: () => void;
};

export function BlogForm({ onCreated }: BlogFormProps) {
  const editorRef = useRef<Editor>(null);
  const form = useForm({
    defaultValues: defaultBlog,
    validators: {
      onSubmit: createBlogFormSchema,
    },
    async onSubmit(props) {
      try {
        const response = await createBlog({ data: props.value });

        if (response?.success) {
          toast.success('Blog created successfully');
          form.reset();
          onCreated?.();
        } else {
          throw new Error('Create blog failed');
        }
      } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
          toast.error(error.message);
        } else {
          console.error(error);
        }
      }
    },
  });

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      await form.handleSubmit();
      editorRef.current?.commands.clearContent();
    },
    [form.handleSubmit]
  );

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg" noValidate>
      <Card>
        <CardHeader>
          <CardTitle>Create new blog</CardTitle>
          <CardDescription>Fill out the form to add a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="title" validators={{ onChange: titleSchema }}>
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <em
                  className={cn(
                    'invisible min-h-lh text-red-400 text-xs',
                    field.state.meta.errors.length > 0 && 'visible'
                  )}
                >
                  {field.state.meta.errors.map((err) => err?.message).join(', ')}
                </em>
              </div>
            )}
          </form.Field>

          <form.Field name="content" validators={{ onChange: contentSchema }}>
            {(field) => (
              <RichTextEditor
                onUpdate={(editor) => {
                  field.handleChange(editor.getHTML());
                }}
                editorRef={editorRef}
              />
            )}
          </form.Field>
        </CardContent>
        <CardFooter>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting || !form.state.isDirty}>
                Create blog
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
