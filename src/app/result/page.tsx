'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { recommendations } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Video, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getAiSummary } from '@/ai/flows/generate-summary-flow';
import type { AiSummaryOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResultPage() {
  const { triageResult, logout } = useAuth();
  const router = useRouter();
  const [aiSummary, setAiSummary] = useState<AiSummaryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (triageResult && (triageResult.careLevel === 'Yellow' || triageResult.careLevel === 'Green')) {
      const fetchSummary = async () => {
        setIsLoading(true);
        try {
          const result = await getAiSummary({
            symptom: triageResult.symptom || '',
            answers: triageResult.answers || {},
          });
          setAiSummary(result);
        } catch (error) {
          console.error('AI summary error:', error);
          // Fallback to static recommendations on error
        } finally {
          setIsLoading(false);
        }
      };
      fetchSummary();
    }
  }, [triageResult]);

  if (!triageResult) {
    return null;
  }

  const { careLevel } = triageResult;
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
    logout();
    router.push('/');
  };

  const nextSteps = aiSummary?.nextSteps || resultData.nextSteps;

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
              {isLoading ? (
                <Skeleton className="h-5 w-3/4 mx-auto" />
              ) : (
                aiSummary?.summary || resultData.description
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Next Steps</h3>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ) : (
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
              )}
            </div>

            { (careLevel === 'Yellow' || careLevel === 'Green') && (
              <div className="flex items-center justify-center text-sm text-muted-foreground pt-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <p>Generating personalized guidance...</p>
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    <p>Personalized guidance powered by Generative AI. Always consult a healthcare professional.</p>
                  </>
                )}
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
