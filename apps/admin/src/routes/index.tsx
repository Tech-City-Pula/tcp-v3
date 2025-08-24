import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/')({
  component: Home,
});

const loginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const loginAction = createServerFn({ method: 'POST' })
  .validator(loginInputSchema)
  .handler(({ data }) => {
    console.log(data);
  });

const defaultLoginInfo: z.infer<typeof loginInputSchema> = { username: '', password: '' };

function LoginForm() {
  const form = useForm({
    defaultValues: defaultLoginInfo,
    validators: {
      onSubmit: loginInputSchema,
    },
    async onSubmit(props) {
      await loginAction({ data: props.value });
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await form.handleSubmit();
      }}
      className="w-full max-w-xs"
    >
      <Card>
        <CardHeader>
          <CardTitle>login</CardTitle>
          <CardDescription>enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="username"
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
                </div>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">login</Button>
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
