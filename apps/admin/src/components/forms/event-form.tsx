import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type CreateEventInput, createEventSchema } from '@/lib/validation/events';
import { createEvent } from '@/server/events';

export type EventFormProps = {
  onCreated?: () => void;
};

export function EventForm({ onCreated }: EventFormProps) {
  const defaultEvent: CreateEventInput = { title: '', description: '', eventAt: '', location: '' } as const;

  const form = useForm({
    defaultValues: defaultEvent,
    validators: {
      onSubmit: createEventSchema,
    },
    async onSubmit(props) {
      try {
        const response = await createEvent({ data: props.value });

        if (response?.success) {
          toast.success('Event created successfully');
          form.reset();
          onCreated?.();
        } else {
          throw new Error('Create event failed');
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
          <CardTitle>Create new event</CardTitle>
          <CardDescription>Fill out the form to add a new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="title" validators={{ onChange: createEventSchema.shape.title }}>
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

          <form.Field name="description" validators={{ onChange: createEventSchema.shape.description }}>
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <textarea
                  id={field.name}
                  className="w-full"
                  style={{ minHeight: '6rem' }}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
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

          <form.Field name="eventAt" validators={{ onChange: createEventSchema.shape.eventAt }}>
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  id={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
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

          <form.Field name="location" validators={{ onChange: createEventSchema.shape.location }}>
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
        </CardContent>
        <CardFooter>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting || !form.state.isDirty}>
                Create event
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}

export default EventForm;
