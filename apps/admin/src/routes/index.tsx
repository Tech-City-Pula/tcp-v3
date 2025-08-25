import { auth } from '@repo/backend/auth';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { createAuthClient } from 'better-auth/react';
import { type FormEventHandler, useCallback } from 'react';
import { toast } from 'sonner';
import z, { ZodError } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001', // The base URL of your auth server
});

const getInitialSession = createServerFn({
  method: 'GET',
}).handler(async () => {
  const request = getWebRequest();

  const session = await auth.api.getSession(request);

  if (!session) {
    return {
      session: undefined,
      user: undefined,
    };
  }

  return {
    session: session.session,
    user: session.user,
  };
});

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad() {
    return getInitialSession();
  },
  loader(ctx) {
    return ctx.context;
  },
});

const passwordMinLength = 8;
const passwordMaxLength = 72;

const emailMinLength = 8;
const emailMaxLength = 256;

const emailSchema = z
  .email({ message: 'Please enter a valid email address.' })
  .min(emailMinLength, { message: `Email must be at least ${emailMinLength} characters.` })
  .max(emailMaxLength, { message: `Email must be at most ${emailMaxLength} characters.` });

const passwordSchema = z
  .string()
  .min(passwordMinLength, { message: `Password must be at least ${passwordMinLength} characters.` })
  .max(passwordMaxLength, { message: `Password must be at most ${passwordMaxLength} characters.` });

const loginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const defaultLoginInfo: z.infer<typeof loginInputSchema> = { email: '', password: '' };

function LoginForm() {
  const loaderData = Route.useLoaderData();

  const session = authClient.useSession();
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

        console.log(response);

        toast.success('Logged in successfully!');

        form.reset();
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

  // const user = loaderData.session?.user ?? session.data?.user;
  const user = loaderData.user ?? session.data?.user;

  const navigate = Route.useNavigate();

  if (user) {
    return (
      <div>
        <h1>Welcome back, {user.name}</h1>
        <Button
          onClick={async () => {
            await authClient.signOut();

            await navigate({
              to: '/',
            });
          }}
        />
      </div>
    );
  }

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
            validators={{
              onChange: emailSchema,
            }}
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
                      'invisible min-h-lh text-red-400 text-xs',
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
            validators={{
              onChange: passwordSchema,
            }}
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting || !form.state.isDirty}>
                login
              </Button>
            )}
          />
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
