import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });

  const password = form.watch('password');
  const passwordStrength = !password ? null
    : password.length < 6 ? 'weak'
    : password.length < 10 ? 'medium'
    : 'strong';

  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-amber-500',
    strong: 'bg-green-500',
  };
  const strengthWidth = { weak: 'w-1/3', medium: 'w-2/3', strong: 'w-full' };

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    try {
      await signup(data.name, data.email, data.password);
      navigate('/', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.error?.message 
        || err?.response?.data?.message 
        || err?.response?.data?.data?.message
        || 'Failed to create account. Please make sure the backend is running and try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm animate-slideDown">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Full name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Full name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  autoComplete="name"
                  className="h-11 rounded-lg border-border focus-visible:ring-brand/40 focus-visible:border-brand transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 rounded-lg border-border focus-visible:ring-brand/40 focus-visible:border-brand transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    className="h-11 rounded-lg border-border focus-visible:ring-brand/40 focus-visible:border-brand pr-10 transition-colors"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </FormControl>
              {/* Password strength bar */}
              {passwordStrength && (
                <div className="mt-1.5 space-y-1">
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strengthColor[passwordStrength]} ${strengthWidth[passwordStrength]}`} />
                  </div>
                  <p className={`text-xs capitalize ${
                    passwordStrength === 'weak' ? 'text-red-500' :
                    passwordStrength === 'medium' ? 'text-amber-600' : 'text-green-600'
                  }`}>{passwordStrength} password</p>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-500" />
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          style={{ backgroundColor: 'oklch(0.28 0.18 240)' }}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
          {isLoading ? 'Creating account...' : 'Create free account'}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold hover:underline cursor-pointer" style={{ color: 'oklch(0.28 0.18 240)' }}>
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUp;

