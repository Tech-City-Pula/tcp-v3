import { parseDate } from '@internationalized/date';
import { useForm } from '@tanstack/react-form';
import type { Editor } from '@tiptap/react';
import { CalendarIcon } from 'lucide-react';
import { type FormEventHandler, useCallback, useRef } from 'react';
import { DatePicker, Dialog, Group, Popover, Button as RacButton, Label as RacLabel } from 'react-aria-components';
import { toast } from 'sonner';
import type z from 'zod';
import { ZodError } from 'zod';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar-rac';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DateInput } from '@/components/ui/datefield-rac';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
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
    <form onSubmit={onSubmit} className="w-full max-w-lg" noValidate>
      <Card>
        <CardHeader>
          <CardTitle>Create new event</CardTitle>
          <CardDescription>Fill out the form to add a new event</CardDescription>
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
              <div className="*:not-first:mt-2">
                <RacLabel className="font-medium text-foreground text-sm">{field.name}</RacLabel>
                <DatePicker
                  className="*:not-first:mt-2"
                  value={field.state.value ? parseDate(field.state.value.substring(0, 10)) : undefined}
                  onChange={(v) => field.handleChange(v ? v.toString() : '')}
                >
                  <div className="flex">
                    <Group className="w-full">
                      <DateInput
                        className="pe-9"
                        /**
                         * React Aria DateInput uses a DateValue internally. When user types/picks,
                         * onChange on the DatePicker will provide a DateValue; here we only need to
                         * reflect the string to the form field.
                         */
                      />
                    </Group>
                    <RacButton className="-me-px -ms-9 z-10 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50">
                      <CalendarIcon size={16} />
                    </RacButton>
                  </div>
                  <Popover
                    className="data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border bg-background text-popover-foreground shadow-lg outline-hidden data-entering:animate-in data-exiting:animate-out"
                    offset={4}
                  >
                    <Dialog className="max-h-[inherit] overflow-auto p-2">
                      <Calendar />
                    </Dialog>
                  </Popover>
                </DatePicker>
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

          <form.Field name="location" validators={{ onChange: locationSchema }}>
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
