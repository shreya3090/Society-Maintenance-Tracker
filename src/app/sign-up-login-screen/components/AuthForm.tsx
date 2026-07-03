'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Eye, EyeOff, Copy, Check, LogIn, UserPlus, Home } from 'lucide-react';
import { toast } from 'sonner';

type Role = 'resident' | 'admin';
type Tab = 'login' | 'register';

interface LoginFormData {
  email: string;
  password: string;
  role: Role;
  rememberMe: boolean;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  flatNumber: string;
  password: string;
  confirmPassword: string;
  role: Role;
  agreeTerms: boolean;
}

const mockCredentials = [
  { role: 'Admin', email: 'rajesh.admin@greenwoodapts.in', password: 'Admin@2026' },
  { role: 'Resident', email: 'priya.sharma@greenwoodapts.in', password: 'Resident@2026' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-muted-foreground hover:text-primary transition-colors btn-press p-0.5 rounded"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  );
}

export default function AuthForm() {
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginRole, setLoginRole] = useState<Role>('resident');
  const [registerRole, setRegisterRole] = useState<Role>('resident');
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', role: 'resident', rememberMe: false },
  });

  const registerForm = useForm<RegisterFormData>({
    defaultValues: { fullName: '', email: '', flatNumber: '', password: '', confirmPassword: '', role: 'resident', agreeTerms: false },
  });

  const fillCredentials = (email: string, password: string) => {
    loginForm.setValue('email', email);
    loginForm.setValue('password', password);
    toast.success('Credentials filled — click Sign In to continue');
  };

  const handleLogin = async (data: LoginFormData) => {
    const valid = mockCredentials.some(
      (c) => c.email === data.email && c.password === data.password
    );
    if (!valid) {
      loginForm.setError('email', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }
    setIsSubmitting(true);
    // BACKEND INTEGRATION: POST /api/auth/login with { email, password, role }
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success('Signed in successfully');
    if (data.role === 'admin') {
      router.push('/admin-dashboard');
    } else {
      router.push('/notice-board');
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setIsSubmitting(true);
    // BACKEND INTEGRATION: POST /api/auth/register with { fullName, email, flatNumber, password, role }
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success('Account created! Please sign in.');
    setTab('login');
    registerForm.reset();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-background min-h-screen lg:min-h-0">
      <div className="w-full max-w-md space-y-6">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-2">
          <Home size={20} className="text-primary" />
          <span className="font-800 text-lg text-foreground tracking-tight">SocietyDesk</span>
        </div>

        {/* Tabs */}
        <div>
          <h2 className="text-2xl font-700 text-foreground mb-1">
            {tab === 'login' ? 'Sign in to your account' : 'Create an account'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {tab === 'login' ?'Access your society portal' :'Join your society on SocietyDesk'}
          </p>
        </div>

        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(['login', 'register'] as Tab[]).map((t) => (
            <button
              key={`tab-${t}`}
              onClick={() => setTab(t)}
              suppressHydrationWarning
              className={`flex-1 text-sm font-600 py-2 rounded-md transition-all btn-press ${
                tab === t
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 fade-in">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-600 text-foreground mb-1.5">
                I am a
              </label>
              <div className="flex gap-2">
                {(['resident', 'admin'] as Role[]).map((r) => (
                  <button
                    key={`role-login-${r}`}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                      setLoginRole(r);
                      loginForm.setValue('role', r);
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-600 border transition-all btn-press ${
                      loginRole === r
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-secondary-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {r === 'resident' ? '🏠 Resident' : '🔧 Admin'}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-600 text-foreground mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@greenwoodapts.in"
                suppressHydrationWarning
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                  loginForm.formState.errors.email ? 'border-red-400' : 'border-input hover:border-primary/50'
                }`}
                {...loginForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-600 text-foreground">
                  Password
                </label>
                <button type="button" suppressHydrationWarning className="text-xs text-primary hover:underline font-500">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  suppressHydrationWarning
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                    loginForm.formState.errors.password ? 'border-red-400' : 'border-input hover:border-primary/50'
                  }`}
                  {...loginForm.register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                suppressHydrationWarning
                className="w-4 h-4 rounded border-input accent-primary"
                {...loginForm.register('rememberMe')}
              />
              <label htmlFor="remember-me" className="text-sm text-secondary-foreground">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              suppressHydrationWarning
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-600 text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-all btn-press disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ minHeight: '42px' }}
            >
              {isSubmitting ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>

            {/* Demo credentials */}
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-xs font-600 text-muted-foreground mb-2 uppercase tracking-wide">
                Demo Accounts
              </p>
              <div className="space-y-1.5">
                {mockCredentials.map((cred) => (
                  <div
                    key={`cred-${cred.role}`}
                    className="flex items-center justify-between gap-2 bg-card rounded-md px-3 py-2 border border-border"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-700 bg-primary/10 text-primary rounded px-1.5 py-0.5 flex-shrink-0">
                        {cred.role.toUpperCase()}
                      </span>
                      <span className="text-xs text-foreground truncate">{cred.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <CopyButton text={cred.email} />
                      <button
                        type="button"
                        onClick={() => fillCredentials(cred.email, cred.password)}
                        suppressHydrationWarning
                        className="text-[10px] font-600 text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded btn-press"
                      >
                        Use
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4 fade-in">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-600 text-foreground mb-1.5">
                Registering as
              </label>
              <div className="flex gap-2">
                {(['resident', 'admin'] as Role[]).map((r) => (
                  <button
                    key={`role-reg-${r}`}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                      setRegisterRole(r);
                      registerForm.setValue('role', r);
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-600 border transition-all btn-press ${
                      registerRole === r
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-secondary-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {r === 'resident' ? '🏠 Resident' : '🔧 Admin'}
                  </button>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div>
              <label htmlFor="reg-fullname" className="block text-sm font-600 text-foreground mb-1.5">
                Full name
              </label>
              <input
                id="reg-fullname"
                type="text"
                autoComplete="name"
                placeholder="Priya Sharma"
                suppressHydrationWarning
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                  registerForm.formState.errors.fullName ? 'border-red-400' : 'border-input hover:border-primary/50'
                }`}
                {...registerForm.register('fullName', { required: 'Full name is required' })}
              />
              {registerForm.formState.errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {registerForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            {/* Flat number — only for residents */}
            {registerRole === 'resident' && (
              <div className="fade-in">
                <label htmlFor="reg-flat" className="block text-sm font-600 text-foreground mb-1.5">
                  Flat / Unit number
                </label>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Enter your assigned flat number (e.g. B-304, A-102)
                </p>
                <input
                  id="reg-flat"
                  type="text"
                  placeholder="B-304"
                  suppressHydrationWarning
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                    registerForm.formState.errors.flatNumber ? 'border-red-400' : 'border-input hover:border-primary/50'
                  }`}
                  {...registerForm.register('flatNumber', {
                    required: registerRole === 'resident' ? 'Flat number is required' : false,
                  })}
                />
                {registerForm.formState.errors.flatNumber && (
                  <p className="mt-1.5 text-xs text-red-500 font-500">
                    {registerForm.formState.errors.flatNumber.message}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-600 text-foreground mb-1.5">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@greenwoodapts.in"
                suppressHydrationWarning
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                  registerForm.formState.errors.email ? 'border-red-400' : 'border-input hover:border-primary/50'
                }`}
                {...registerForm.register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {registerForm.formState.errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-600 text-foreground mb-1.5">
                Password
              </label>
              <p className="text-xs text-muted-foreground mb-1.5">
                Minimum 8 characters with at least one uppercase and one number
              </p>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  suppressHydrationWarning
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                    registerForm.formState.errors.password ? 'border-red-400' : 'border-input hover:border-primary/50'
                  }`}
                  {...registerForm.register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).+$/,
                      message: 'Must include one uppercase letter and one number',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {registerForm.formState.errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-600 text-foreground mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="reg-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  suppressHydrationWarning
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                    registerForm.formState.errors.confirmPassword ? 'border-red-400' : 'border-input hover:border-primary/50'
                  }`}
                  {...registerForm.register('confirmPassword', { required: 'Please confirm your password' })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500 font-500">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="agree-terms"
                type="checkbox"
                suppressHydrationWarning
                className="w-4 h-4 mt-0.5 rounded border-input accent-primary flex-shrink-0"
                {...registerForm.register('agreeTerms', {
                  required: 'You must agree to the terms to register',
                })}
              />
              <label htmlFor="agree-terms" className="text-sm text-secondary-foreground leading-snug">
                I agree to the{' '}
                <span className="text-primary hover:underline cursor-pointer font-500">Terms of Service</span>
                {' '}and{' '}
                <span className="text-primary hover:underline cursor-pointer font-500">Privacy Policy</span>
              </label>
            </div>
            {registerForm.formState.errors.agreeTerms && (
              <p className="text-xs text-red-500 font-500">
                {registerForm.formState.errors.agreeTerms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              suppressHydrationWarning
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-600 text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-all btn-press disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ minHeight: '42px' }}
            >
              {isSubmitting ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          {tab === 'login' ? (
            <>
              New to SocietyDesk?{' '}
              <button suppressHydrationWarning onClick={() => setTab('register')} className="text-primary font-600 hover:underline">
                Register now
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button suppressHydrationWarning onClick={() => setTab('login')} className="text-primary font-600 hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
