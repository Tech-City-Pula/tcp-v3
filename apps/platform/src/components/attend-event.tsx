import { toast } from '@repo/ui/components/shadcn/sonner';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { ZodError } from 'zod';
import { type EventAttendanceInput, emailSchema, eventAttendanceSchema } from '../lib/validation';
import { attendEvent } from '../server/event-attendance';

type EventAttendProps = {
  eventId: string;
  onSuccess?: () => void;
};

const defaultAttendanceInfo: EventAttendanceInput = { email: '' } as const;

export function EventAttend({ eventId, onSuccess }: EventAttendProps) {
  const form = useForm({
    defaultValues: defaultAttendanceInfo,
    validators: {
      onSubmit: eventAttendanceSchema,
    },
    async onSubmit(props) {
      try {
        await attendEvent({
          data: {
            email: props.value.email,
            eventId,
          },
        });

        toast.success('Successfully registered for the event!');
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (error instanceof Error || error instanceof ZodError) {
          // Check if user is already registered
          if (
            error.message.toLowerCase().includes('already registered') ||
            error.message.toLowerCase().includes('already attending')
          ) {
            toast.error('You are already registered for this event');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error('An unknown error occurred');
        }
      }
    },
  });

  const handleFormSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      await form.handleSubmit();
    },
    [form.handleSubmit]
  );

  return (
    <section>
      <form onSubmit={handleFormSubmit} noValidate>
        <form.Field
          name="email"
          validators={{
            onChange: emailSchema,
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>
                Register your email to attend this event:
              </label>
              <input
                autoComplete="email"
                id={field.name}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@email.com"
                type="email"
                value={field.state.value}
              />
              <div
                className={cn(
                  field.state.meta.errors.length === 0 && 'invisible'
                )}
              >
                {field.state.meta.errors.map((err, index) => (
                  <div key={index}>{err?.message}</div>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button
              disabled={!canSubmit || isSubmitting || !form.state.isDirty}
              type="submit"
            >
              {isSubmitting ? 'Registering…' : '[+] REGISTER_FOR_EVENT'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}
