import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const Route = createFileRoute('/')({
  component: Home,
});

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  hobbies: z.array(z.string()),
});

const logOnServer = createServerFn({ method: 'POST' })
  .validator(userSchema)
  .handler(({ data }) => {
    console.log(data);
  });

const defaultUser = { firstName: '', lastName: '', hobbies: [] } satisfies z.infer<typeof userSchema>;

function Home() {
  const form = useForm({
    defaultValues: defaultUser,
    async onSubmit(props) {
      await logOnServer({
        data: props.value,
      });

      props.formApi.reset();
    },
  });

  return (
    <div>
      <form>
        <form.Field name="firstName">
          {() => {
            return <div>fkoff</div>;
          }}
        </form.Field>
      </form>
    </div>
  );
}
