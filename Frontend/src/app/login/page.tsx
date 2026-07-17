'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginSchemaType } from '@/validations/login.schema';
import { useLogin } from '@/hooks/useAuth';
import { Container } from '@/components/layout/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    login.mutate(data);
  };

  return (
    <Container as="section" className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your StudyGenie account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />
            {login.error && (
              <Text size="sm" className="text-danger">
                {(login.error as { message?: string })?.message || 'Invalid email or password.'}
              </Text>
            )}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting || login.isPending}
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => authService.googleLogin()}
          >
            Continue with Google
          </Button>

          <Text size="sm" className="mt-6 text-center text-muted">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.register} className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
    </Container>
  );
}
