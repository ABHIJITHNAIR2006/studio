'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container flex h-full flex-col items-center justify-center text-center py-20 md:py-32">
      <div
        className="animate-fade-in-slide-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Intelligent Symptom Triage
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Get instant, AI-powered guidance on your health concerns. TriageNow Pro helps you understand
          your symptoms and find the right care.
        </p>
      </div>
      <div
        className="mt-10 animate-fade-in-slide-up"
        style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
      >
        <Button asChild size="lg" className="group">
          <Link href="/triage">
            Start Triage
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
