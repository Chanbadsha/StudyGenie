'use client';

import { useState } from 'react';
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

const DEMO_CREDENTIALS = {
  email: 'demo@studygenie.com',
  password: 'Demo@123',
};

export default function LoginPage() {
  const login = useLogin();
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    login.mutate(data);
  };

  async function handleDemoLogin() {
    setIsDemoLoading(true);
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    try {
      await authService.register({ name: 'Demo User', ...DEMO_CREDENTIALS });
    } catch {
      // demo user may already exist — proceed to login
    }
    login.mutate(DEMO_CREDENTIALS);
  }

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
              <span className="bg-background px-2 text-muted">or</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              fullWidth
              isLoading={isDemoLoading}
              onClick={handleDemoLogin}
            >
              Demo Login
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => authService.googleLogin()}
            >
              Continue with Google
            </Button>
          </div>

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
