import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Input } from '@repo/ui/components/shadcn/input';
import { Label } from '@repo/ui/components/shadcn/label';
import { cn } from '@repo/ui/utils';
import { useForm } from '@tanstack/react-form';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { authClient } from '@/lib/auth/client';
import { emailSchema, type LoginInput, loginInputSchema, passwordSchema } from '@/lib/validation/auth';

const defaultLoginInfo: LoginInput = { email: '', password: '' } as const;

export function LoginForm() {
  const form = useForm({
    defaultValues: defaultLoginInfo,
    validators: {
      onSubmit: loginInputSchema,
    },
    async onSubmit(props) {
      try {
        const response = await authClient.signIn.email({
          email: props.value.email,
          password: props.value.password,
        });

        if (response.data) {
          toast.success('Logged in successfully!');
          form.reset();
        } else {
          throw new Error(response.error.message);
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

  const login = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      await form.handleSubmit();
    },
    [form.handleSubmit]
  );

  return (
    <form onSubmit={login} className="w-full max-w-xs" noValidate>
      <Card>
        <CardHeader>
          <CardTitle>login</CardTitle>
          <CardDescription>enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="email"
            validators={{
              onChange: emailSchema,
              onBlur: emailSchema,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  id={field.name}
                  type="email"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  onBlur={field.handleBlur}
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

          <form.Field
            name="password"
            validators={{
              onChange: passwordSchema,
              onBlur: passwordSchema,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.name}</Label>
                <Input
                  id={field.name}
                  type="password"
                  autoComplete="current-password"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  onBlur={field.handleBlur}
                />
                <em
                  className={cn('invisible h-lh text-red-400 text-xs', field.state.meta.errors.length > 0 && 'visible')}
                >
                  {field.state.meta.errors.map((err) => err?.message).join(', ')}
                </em>
              </div>
            )}
          </form.Field>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
