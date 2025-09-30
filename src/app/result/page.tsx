'use client';

import { useAuth } from '@/hooks/use-auth';
import { recommendations } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Video, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const { triageResult, clearTriageResult } = useAuth();
  const router = useRouter();

  if (!triageResult) {
    return null;
  }

  const { careLevel, symptom } = triageResult;
  const resultData = recommendations[careLevel];

  const badgeClass = {
    Red: 'bg-destructive/20 text-destructive border-destructive/30 glow-red',
    Yellow: 'bg-warning/20 text-warning border-warning/30 glow-yellow',
    Green: 'bg-success/20 text-success border-success/30 glow-green',
  };

  const textClass = {
    Red: 'text-destructive',
    Yellow: 'text-warning',
    Green: 'text-success',
  };

  const handleFinish = () => {
    clearTriageResult();
    router.push('/');
  };

  let homeCareSteps: string[] = [];
  if (careLevel === 'Green' && resultData.homeCare) {
    if (symptom && resultData.homeCare[symptom]) {
      homeCareSteps = resultData.homeCare[symptom];
    } else {
      homeCareSteps = resultData.homeCare.default || [];
    }
  }
  const nextSteps = resultData.nextSteps;

  return (
    <div className="container py-12">
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl animate-fade-in-scale-up">
          <CardHeader className="text-center items-center">
            <Badge className={cn('text-lg px-4 py-1 rounded-full uppercase', badgeClass[careLevel])}>
              {resultData.careLevel}
            </Badge>
            <CardTitle className={cn('text-3xl font-bold pt-4', textClass[careLevel])}>
              {resultData.title}
            </CardTitle>
            <CardDescription className="pt-2 text-base">
              {resultData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Next Steps</h3>
                <ul className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start animate-fade-in-slide-up"
                      style={{ animationDelay: `${0.2 * (index + 1)}s`, animationFillMode: 'backwards' }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
            </div>
            
            {homeCareSteps.length > 0 && (
              <div className="animate-fade-in-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <HeartPulse className="h-5 w-5 mr-2 text-primary" />
                  Home Care for {symptom}
                </h3>
                <ul className="space-y-3 list-none bg-accent/20 p-4 rounded-lg border border-accent/30">
                  {homeCareSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 group hover:shadow-lg hover:shadow-primary/30"
              >
                <Video className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Book Televisit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 group hover:shadow-lg hover:shadow-accent/30"
              >
                <Download className="h-5 w-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                Download Summary PDF
              </Button>
            </div>
            <div className="text-center pt-4">
              <Button variant="link" onClick={handleFinish}>
                Finish and return home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
