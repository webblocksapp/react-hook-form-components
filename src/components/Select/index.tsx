import React, { useEffect, useState } from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  FormGroup,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface SelectProps extends MuiSelectProps {
  control?: Control<any>;
  errorMessage?: string;
  options?: Array<{ value: string | number; label: string }>;
}

export const Select: React.FC<SelectProps> = ({ control, errorMessage, options, ...rest }) => {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<SelectProps['value']>('');
  const controller =
    control &&
    useController({
      name: rest.name,
      control,
      defaultValue: rest.value,
    });

  const onChange: SelectProps['onChange'] = (event, child) => {
    controller?.field?.onChange(event);
    rest?.onChange?.(event, child);
  };

  const onBlur: SelectProps['onBlur'] = (event) => {
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
      <FormControl fullWidth={rest.fullWidth}>
        <InputLabel error={error}>{rest.label}</InputLabel>
        <MuiSelect {...rest} value={value} error={error} onChange={onChange} onBlur={onBlur}>
          {options.map((item, index) => (
            <MenuItem key={index} value={item.value} selected={item.value == value}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
      {error && (
        <FormHelperText error={error}>
          {errorMessage || controller?.fieldState?.error?.message}
        </FormHelperText>
      )}
    </FormGroup>
  );
};
Select.defaultProps = {
  fullWidth: true,
};
