import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import type z from 'zod';
import { ZodError } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
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
    },
    [form.handleSubmit]
  );

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl" noValidate>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={10}
                />
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
