import { parseDate } from '@internationalized/date';
import { RichTextEditor } from '@repo/ui/components/rich-text-editor';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { DateInput } from '@repo/ui/components/shadcn/datefield-rac';
import { Input } from '@repo/ui/components/shadcn/input';
import { Label } from '@repo/ui/components/shadcn/label';
import { toast } from '@repo/ui/components/shadcn/sonner';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import type { Editor } from '@tiptap/core';
import { CalendarIcon } from 'lucide-react';
import { type FormEventHandler, useCallback, useRef } from 'react';
import {
  Calendar,
  DatePicker,
  Dialog,
  Group,
  Popover,
  Button as RacButton,
  Label as RacLabel,
} from 'react-aria-components';
import type z from 'zod';
import { ZodError } from 'zod';
import {
  createEventFormSchema,
  descriptionSchema,
  eventAtBaseSchema,
  locationSchema,
  titleSchema,
} from '@/lib/validation/events';
import { createEvent } from '@/server/events';

const defaultEvent: z.infer<typeof createEventFormSchema> = {
  title: '',
  description: '',
  eventAt: '',
  location: '',
} as const;
export type EventFormProps = {
  onCreated?: () => void;
};

export function EventForm({ onCreated }: EventFormProps) {
  const editorRef = useRef<Editor>(null);
  const form = useForm({
    defaultValues: defaultEvent,
    validators: {
      onSubmit: createEventFormSchema,
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
      editorRef.current?.commands.clearContent();
    },
    [form.handleSubmit]
  );

  return (
    <form onSubmit={onSubmit}  noValidate>
      <Card>
        <CardHeader>
          <CardTitle>Create new event</CardTitle>
          <CardDescription>Fill out the form to add a new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="title" validators={{ onChange: titleSchema }}>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <em
                  className={cn(
                    field.state.meta.errors.length > 0 && 'visible'
                  )}
                >
                  {field.state.meta.errors.map((err) => err?.message).join(', ')}
                </em>
              </div>
            )}
          </form.Field>

          <form.Field name="description" validators={{ onChange: descriptionSchema }}>
            {(field) => (
              <RichTextEditor
                onUpdate={(editor) => {
                  field.handleChange(editor.getHTML());
                }}
                editorRef={editorRef}
              />
            )}
          </form.Field>

          <form.Field name="eventAt" validators={{ onChange: eventAtBaseSchema }}>
            {(field) => (
              <div>
                <RacLabel>{field.name}</RacLabel>
                <DatePicker
                 
                  value={field.state.value ? parseDate(field.state.value.substring(0, 10)) : undefined}
                  onChange={(v) => field.handleChange(v ? v.toString() : '')}
                >
                  <div>
                    <Group >
                      <DateInput
                       
                        /**
                         * React Aria DateInput uses a DateValue internally. When user types/picks,
                         * onChange on the DatePicker will provide a DateValue; here we only need to
                         * reflect the string to the form field.
                         */
                      />
                    </Group>
                    <RacButton>
                      <CalendarIcon size={16} />
                    </RacButton>
                  </div>
                  <Popover
                   
                    offset={4}
                  >
                    <Dialog>
                      <Calendar />
                    </Dialog>
                  </Popover>
                </DatePicker>
                <em
                  className={cn(
                    field.state.meta.errors.length > 0 && 'visible'
                  )}
                >
                  {field.state.meta.errors.map((err) => err?.message).join(', ')}
                </em>
              </div>
            )}
          </form.Field>

          <form.Field name="location" validators={{ onChange: locationSchema }}>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input id={field.name} value={field.state.value} onChange=(e) => field.handleChange(e.target.value)} />
                <em
                  className={cn(
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
              <Button type="submit"  disabled={!canSubmit || isSubmitting || !form.state.isDirty}>
                Create event
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
