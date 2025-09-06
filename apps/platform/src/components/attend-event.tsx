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
    <section className="mx-auto max-w-4xl px-8 pb-16 text-center">
      <form className="mx-auto max-w-md" onSubmit={handleFormSubmit} noValidate>
        <form.Field
          name="email"
          validators={{
            onChange: emailSchema,
          }}
        >
          {(field) => (
            <div className="mb-2 flex flex-col gap-2">
              <label className="block text-left font-mono text-emerald-400" htmlFor={field.name}>
                Register your email to attend this event:
              </label>
              <input
                autoComplete="email"
                className="w-full rounded border border-emerald-500 bg-black p-3 text-emerald-200 focus:border-emerald-400 focus:outline-none"
                id={field.name}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@email.com"
                type="email"
                value={field.state.value}
              />
              <div
                className={cn(
                  'min-h-[3rem] text-left font-mono text-red-400 text-sm',
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
              className="w-full rounded border-2 border-emerald-500 bg-black px-8 py-3 font-bold font-mono text-emerald-500 text-lg transition-all duration-300 hover:bg-emerald-500 hover:text-black disabled:opacity-60"
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
