'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Stethoscope, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: 'Symptom Checker',
    description: 'Describe your symptoms and answer a few simple questions to get an assessment.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Static Questionnaires',
    description: 'Answer a standard set of questions to help assess the severity of your symptoms.',
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: 'Standardized Guidance',
    description: 'Receive care summaries and next steps based on your answers.',
  },
];

export default function Home() {
  return (
    <div className="container flex h-full flex-col items-center justify-center text-center py-20 md:py-32">
      <div
        className="animate-fade-in-slide-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Symptom Triage
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Get guidance on your health concerns. TriageNow helps you understand
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
      <div className="mt-20 w-full max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          How It Works
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
             <div
             key={index}
             className="animate-fade-in-slide-up"
             style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'backwards' }}
           >
            <Card className="text-left h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
