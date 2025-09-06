import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Input } from '@repo/ui/components/shadcn/input';
import { Label } from '@repo/ui/components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/shadcn/radio-group';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import type z from 'zod';
import { ZodError } from 'zod';
import { emailSchema } from '@/lib/validation/auth';
import { membershipTypeSchema, nameSchema } from '@/lib/validation/members';
import { insertNewMember, insertNewMemberSchema } from '@/routes/members';

const defaultEvent: z.infer<typeof insertNewMemberSchema> = {
  firstName: '',
  lastName: '',
  membershipType: 'monthly',
  email: '',
} as const;
export type MemberFormProps = {
  onCreated?: () => void;
};

export function MemberForm({ onCreated }: MemberFormProps) {
  const form = useForm({
    defaultValues: defaultEvent,
    validators: {
      onSubmit: insertNewMemberSchema,
    },
    async onSubmit(props) {
      try {
        const response = await insertNewMember({ data: props.value });

        if (response?.success) {
          toast.success('Member created successfully');
          form.reset();
          onCreated?.();
        } else {
          throw new Error('Create member failed');
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
          <CardTitle>Create new member</CardTitle>
          <CardDescription>Fill out the form to add a new member</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="firstName" validators={{ onChange: nameSchema }}>
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

          <form.Field name="lastName" validators={{ onChange: nameSchema }}>
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

          <form.Field name="email" validators={{ onChange: emailSchema }}>
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  type="email"
                  id={field.name}
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

          <form.Field name="membershipType" validators={{ onChange: membershipTypeSchema }}>
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Membership Type</Label>
                <RadioGroup
                  id={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as 'monthly' | 'yearly')}
                  className="flex flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Yearly</Label>
                  </div>
                </RadioGroup>
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
                Create member
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
