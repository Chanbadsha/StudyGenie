import { forwardRef } from 'react';
import { TextField, Label, TextArea as HeroTextArea } from '@heroui/react';
import type { ChangeEvent } from 'react';

interface TextareaProps {
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, placeholder, className, isDisabled, isReadOnly, isRequired, name, value, defaultValue, onChange, onBlur, rows },
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
          <HeroTextArea
            ref={ref}
            placeholder={placeholder}
            className={className}
            rows={rows}
            onChange={onChange}
            onBlur={onBlur}
          />
        </TextField>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

export { Textarea };
export type { TextareaProps };
