import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: Home,
});

const passwordMinLength = 8;
const passwordMaxLength = 72;

const loginInputSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(passwordMinLength, { message: `Password must be at least ${passwordMinLength} characters.` })
    .max(passwordMaxLength, { message: `Password must be at most ${passwordMaxLength} characters.` }),
});

const adminUsers = [
  {
    email: 'matej@admin.com',
    password: 'StrongPass123',
  },
];

const loginAction = createServerFn({ method: 'POST' })
  .validator(loginInputSchema)
  .handler(({ data }) => {
    console.log(data);

    const adminUser = adminUsers.find((user) => user.email === data.email && user.password === data.password);

    if (!adminUser) {
      throw new Error('User is not admin. Try again with a different user.');
    }
  });

const defaultLoginInfo: z.infer<typeof loginInputSchema> = { email: '', password: '' };

function LoginForm() {
  const form = useForm({
    defaultValues: defaultLoginInfo,
    validators: {
      onChange: loginInputSchema,
    },
    async onSubmit(props) {
      await loginAction({ data: props.value });
    },
  });

  const login = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      try {
        await form.handleSubmit();

        toast.success('Logged in successfully!');

        form.reset();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        console.error(error);
      }
    },
    [form.handleSubmit, form.reset]
  );

  return (
    <form onSubmit={login} className="w-full max-w-xs">
      <Card>
        <CardHeader>
          <CardTitle>login</CardTitle>
          <CardDescription>enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="email"
            children={(field) => {
              return (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>{field.name}</Label>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                  <em
                    className={cn(
                      'invisible h-lh text-red-400 text-xs',
                      field.state.meta.errors.length > 0 && 'visible'
                    )}
                  >
                    {field.state.meta.errors.map((err) => err?.message).join(', ')}
                  </em>
                </div>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              return (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>{field.name}</Label>
                  <Input
                    id={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                  <em
                    className={cn(
                      'invisible h-lh text-red-400 text-xs',
                      field.state.meta.errors.length > 0 && 'visible'
                    )}
                  >
                    {field.state.meta.errors.map((err) => err?.message).join(', ')}
                  </em>
                </div>
              );
            }}
          />
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

function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300">
      <LoginForm />
    </div>
  );
}
