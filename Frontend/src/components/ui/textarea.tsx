import { forwardRef } from 'react';
import { TextField, Label, TextArea as HeroTextArea } from '@heroui/react';

interface TextareaProps {
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, placeholder, className, isDisabled, isReadOnly, isRequired, name, value, defaultValue, onChange, rows },
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
          <HeroTextArea ref={ref} placeholder={placeholder} className={className} rows={rows} />
        </TextField>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

export { Textarea };
export type { TextareaProps };
