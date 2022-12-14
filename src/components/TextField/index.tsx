import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormHelperText,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

export type TextFieldProps = MuiTextFieldProps & {
  control?: Control<any>;
  errorMessage?: string;
};

export const TextField: React.FC<TextFieldProps> = ({ control, errorMessage, ...rest }) => {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<TextFieldProps['value']>('');
  const controller =
    control &&
    useController({
      name: rest.name,
      control,
      defaultValue: rest.value,
    });

  const onChange: TextFieldProps['onChange'] = (event) => {
    controller?.field?.onChange(event);
    rest?.onChange?.(event);
  };

  const onBlur: TextFieldProps['onBlur'] = (event) => {
    controller?.field?.onBlur();
    rest?.onBlur?.(event);
  };

  useEffect(() => {
    setError(rest.error || Boolean(controller?.fieldState?.error?.message));
  }, [rest.error, controller?.fieldState?.error?.message]);

  useEffect(() => {
    setValue(controller?.field?.value ?? (rest.value || ''));
  }, [controller?.field?.value, rest.value]);

  return (
    <FormGroup>
      <MuiTextField {...rest} value={value} onChange={onChange} onBlur={onBlur} error={error} />
      {error && (
        <FormHelperText error={error}>
          {errorMessage || controller?.fieldState?.error?.message}
        </FormHelperText>
      )}
    </FormGroup>
  );
};
TextField.defaultProps = {
  fullWidth: true,
};
