'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Add your email registration logic here
      console.log('Email registration with:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      // Add GitHub sign-in logic here
      console.log('Signing in with GitHub');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Add Google sign-in logic here
      console.log('Signing in with Google');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg backdrop-blur-sm">
        <div className="text-center">
          <h1 className="gradient-text font-heading text-4xl font-bold">Register</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-border bg-background/50 text-foreground"
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#c3f73a] via-[#30f2f2] to-[#5e4ae3] text-black hover:opacity-90 dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up with Email'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleGithubSignIn}
              className="flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 dark:border dark:border-white/20 dark:bg-background dark:hover:bg-background/80"
              disabled={isLoading}
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
            <Button
              type="button"
              onClick={handleGoogleSignIn} 
              className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 dark:border dark:border-white/20 dark:bg-background dark:text-white dark:hover:bg-background/80"
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
          <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#5e4ae3] opacity-30 blur-[100px]"></div>
          <div className="pointer-events-none absolute bottom-0 left-20 h-[400px] w-[400px] rounded-full bg-[#30f2f2] opacity-20 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
}