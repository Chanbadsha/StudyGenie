import { Select as HeroSelect } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
}

function Select({
  children,
  className = '',
  isDisabled,
  isRequired,
  name,
}: SelectProps) {
  return (
    <HeroSelect
      className={className}
      isDisabled={isDisabled}
      isRequired={isRequired}
      name={name}
    >
      <HeroSelect.Trigger>
        <HeroSelect.Value />
        <HeroSelect.Indicator>
          <ChevronDown className="size-4" />
        </HeroSelect.Indicator>
      </HeroSelect.Trigger>
      <HeroSelect.Popover>{children}</HeroSelect.Popover>
    </HeroSelect>
  );
}

export { Select };
export type { SelectProps };
