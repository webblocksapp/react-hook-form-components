import { Select } from '@components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import * as yup from 'yup';

export default {
  title: 'Select',
  component: Select,
};

type Schema1 = { country: number; city: number };

const schema1: yup.SchemaOf<Schema1> = yup.object({
  country: yup.number().required(),
  city: yup.number().required(),
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
    reset({ country: 1, city: 3 });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={2}>
        <Select
          label="Country"
          control={control}
          name="country"
          options={[
            { value: 1, label: 'México' },
            { value: 2, label: 'EEUU' },
            { value: 3, label: 'Colombia' },
          ]}
        />
        <Select
          label="City"
          control={control}
          name="city"
          options={[
            { value: 1, label: 'Ciudad de México' },
            { value: 2, label: 'Washington DC' },
            { value: 3, label: 'Bogotá' },
          ]}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="contained" onClick={fill}>
            Fill
          </Button>
          <Button variant="contained" onClick={() => reset(schema1.getDefault())}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
