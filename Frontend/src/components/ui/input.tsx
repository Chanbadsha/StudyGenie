import { forwardRef } from 'react';
import { TextField, Label, Input as HeroInput } from '@heroui/react';
import type { ChangeEvent } from 'react';

interface InputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, error, placeholder, className, type, isDisabled, isReadOnly, isRequired, name, onChange, onBlur, value, defaultValue },
    ref
  ) {
    return (
      <div className="flex flex-col gap-1.5">
        <TextField
          isInvalid={!!error}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          name={name}
          value={value}
          defaultValue={defaultValue}
        >
          {label && <Label>{label}</Label>}
          <HeroInput
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={className}
            onChange={onChange}
            onBlur={onBlur}
          />
        </TextField>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

export { Input };
export type { InputProps };
