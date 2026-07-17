import { forwardRef } from 'react';
import { TextField, Label, Input as HeroInput } from '@heroui/react';
interface InputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, error, placeholder, className, type, isDisabled, isReadOnly, isRequired, name, onChange, value, defaultValue },
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
          onChange={onChange}
        >
          {label && <Label>{label}</Label>}
          <HeroInput ref={ref} placeholder={placeholder} type={type} className={className} />
        </TextField>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

export { Input };
export type { InputProps };
