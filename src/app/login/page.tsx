'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Stethoscope } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@triage.app' && password === 'demouser123') {
      login(email);
      toast({
        variant: 'success',
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/triage');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Demo Credentials',
        description: 'Please use the provided demo credentials.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-8">
      <Card className="w-full max-w-sm animate-fade-in-scale-up">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Stethoscope className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to TriageNow Pro</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-accent/20 border-accent/30">
            <Info className="h-4 w-4 text-accent" />
            <AlertTitle className="font-semibold text-accent">Demo Login</AlertTitle>
            <AlertDescription className="text-sm">
              <span className="font-semibold">Email:</span> demo@triage.app
              <br />
              <span className="font-semibold">Password:</span> demouser123
            </AlertDescription>
          </Alert>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@triage.app"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demouser123"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className="text-muted-foreground cursor-not-allowed"
                  >
                    Don&apos;t have an account?{' '}
                    <span className="underline opacity-50">
                      Sign up
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign-up is disabled for this demo.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
