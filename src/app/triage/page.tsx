'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { ProgressBar } from '@/components/triage/progress-bar';
import Step1 from '@/components/triage/step-1';
import Step2 from '@/components/triage/step-2';
import Step3 from '@/components/triage/step-3';
import { Button } from '@/components/ui/button';
import { TriageQuestion } from '@/lib/data';
import { getDynamicQuestions } from '@/ai/flows/generate-questions-flow';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const totalSteps = 3;

export default function TriagePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, { value: number, isCritical?: boolean }>>({});
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const { setTriageResult } = useAuth();
  const [dynamicQuestions, setDynamicQuestions] = useState<TriageQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [symptom, setSymptom] = useState('');
  const [symptomLabel, setSymptomLabel] = useState('');

  useEffect(() => {
    if (dynamicQuestions.length > 0 && currentStep === 1 && !isLoading) {
      setCurrentStep(2);
    }
  }, [dynamicQuestions, currentStep, isLoading]);


  const handleNext = async () => {
    setDirection(1);
    if (currentStep === 1 && symptomLabel) {
      setIsLoading(true);
      try {
        const result = await getDynamicQuestions({ symptom: symptomLabel });
        const questions: TriageQuestion[] = result.questions.map(q => ({
          id: q.id,
          text: q.text,
          type: q.type as 'severity' | 'yes_no',
          options: q.options.map(opt => ({...opt})),
        }));
        setDynamicQuestions(questions);
      } catch (error) {
        console.error('Failed to get dynamic questions', error);
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => {
    if (questionId === 'symptom') {
      setSymptom(option.text.toLowerCase());
      setSymptomLabel(option.text);
    }
    setAnswers((prev) => ({ ...prev, [questionId]: { value: option.value, isCritical: option.isCritical } }));
  };
  
  const handleSymptomSelect = () => {
    handleNext();
  };

  const isNextDisabled = () => {
    if (isLoading) return true;
    if (currentStep === 1 && !symptomLabel) return true;
    if (currentStep === 2 && !answers.q2) return true;
    if (currentStep === 3 && !answers.q3) return true;
    return false;
  };

  const handleSubmit = () => {
    const score = Object.values(answers).reduce((acc, answer) => acc + (answer.value || 0), 0);
    let careLevel: 'Green' | 'Yellow' | 'Red' = 'Green';
    if (score > 6 || Object.values(answers).some(a => a.isCritical)) {
      careLevel = 'Red';
    } else if (score > 3) {
      careLevel = 'Yellow';
    }

    setTriageResult({ score, careLevel, symptom: symptomLabel, answers });
    router.push('/result');
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="container relative py-16 md:py-24">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="relative overflow-hidden w-full max-w-2xl mx-auto">
        <div className="relative h-[420px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full absolute"
            >
              {currentStep === 1 && <Step1 onAnswer={handleAnswer} value={symptom} onSymptomSelect={handleSymptomSelect} />}
              {currentStep === 2 && dynamicQuestions[0] && <Step2 onAnswer={handleAnswer} answers={answers} question={dynamicQuestions[0]} />}
              {currentStep === 3 && dynamicQuestions[1] && <Step3 onAnswer={handleAnswer} answers={answers} question={dynamicQuestions[1]} />}
            </motion.div>
          </AnimatePresence>
        </div>
        {isLoading && currentStep === 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="w-full max-w-2xl mx-auto">
                <Card>
                  <CardContent className="p-12 flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating questions...</p>
                  </CardContent>
                </Card>
              </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4">
        <div className="container flex justify-between items-center">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isLoading}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {isLoading && currentStep === 1 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentStep === totalSteps ? 'Finish & See Results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
