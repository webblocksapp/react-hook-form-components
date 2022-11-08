import { TextField } from '@components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import * as yup from 'yup';

export default {
  title: 'TextField',
  component: TextField,
};

type Schema1 = { name: string; email: string };

const schema1: yup.SchemaOf<Schema1> = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export const UsingHookForm = () => {
  const { control, reset, handleSubmit } = useForm<Schema1>({
    resolver: yupResolver(schema1),
    mode: 'all',
  });

  const submit = (data: Schema1) => {
    alert(JSON.stringify(data));
    reset(schema1.getDefault());
  };

  const fill = () => {
    reset({ name: 'John', email: 'john@mail.com' });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField label="Name" control={control} name="name" />
      <TextField label="Email" control={control} name="email" />
      <Button variant="contained" type="submit">
        Submit
      </Button>
      <Button variant="contained" onClick={fill}>
        Fill
      </Button>
      <Button variant="contained" onClick={() => reset(schema1.getDefault())}>
        Reset
      </Button>
    </form>
  );
};
