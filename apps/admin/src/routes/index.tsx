import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';

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

const defaultUser: z.infer<typeof userSchema> = { firstName: '', lastName: '', hobbies: [] };

function Home() {
  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onChange: userSchema,
    },
    async onSubmit(props) {
      console.log(props);
      await logOnServer({
        // data: props.value,
        data: {
          firstName: 'Matej',
          lastName: 'Ljubic',
          hobbies: ['coding', 'swimming'],
        },
      });

      toast('Submitted successfully!');

      props.formApi.reset();
    },
  });

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await form.handleSubmit();
        }}
      >
        <form.Field name="firstName">
          {() => {
            return <div>fkoff</div>;
          }}
        </form.Field>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
