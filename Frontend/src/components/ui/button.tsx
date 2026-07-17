import { forwardRef } from 'react';
import { Button as HeroButton } from '@heroui/react';
import type { ComponentPropsWithRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ComponentPropsWithRef<typeof HeroButton>, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  danger: 'danger',
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', isLoading, children, ...props },
    ref
  ) {
    return (
      <HeroButton
        ref={ref}
        variant={variantMap[variant] as 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'}
        size={sizeMap[size] as 'sm' | 'md' | 'lg'}
        isDisabled={isLoading || props.isDisabled}
        {...props}
      >
        {children}
      </HeroButton>
    );
  }
);

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
