'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { ProgressBar } from '@/components/triage/progress-bar';
import Step1 from '@/components/triage/step-1';
import Step2 from '@/components/triage/step-2';
import Step3 from '@/components/triage/step-3';
import Step4 from '@/components/triage/step-4';
import { Button } from '@/components/ui/button';
import { triageQuestions } from '@/lib/data';
import type { TriageQuestion } from '@/lib/data';

const totalSteps = 4;

export default function TriagePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const { setTriageResult } = useAuth();
  const [symptom, setSymptom] = useState<string | null>(null);

  const questions: TriageQuestion[] = triageQuestions;

  const handleNext = () => {
    setDirection(1);
    if (currentStep < totalSteps) {
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

  const handleAnswer = (questionId: string, option: { text: string; value: number; isCritical?: boolean } | string[]) => {
    if (Array.isArray(option)) {
      const isCritical = additionalSymptoms.some(s => option.includes(s.text) && s.isCritical);
      setAnswers((prev) => ({ 
        ...prev, 
        [questionId]: { value: option.length * 2, isCritical }
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: { value: option.value, isCritical: option.isCritical } }));
    }
  };
  
  const handleSymptomSelect = (selectedSymptom: {text: string, value: number}) => {
    handleAnswer('symptom', selectedSymptom);
    setSymptom(selectedSymptom.text);
    handleNext();
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !symptom) return true;
    if (currentStep === 2 && !answers.q2) return true;
    if (currentStep === 3 && !answers.q3) return true;
    if (currentStep === 4 && !answers.q4) return true;
    return false;
  };

  const additionalSymptoms = triageQuestions[1].options;

  const handleSubmit = () => {
    const score = Object.values(answers).reduce((acc, answer) => acc + (answer.value || 0), 0);
    let careLevel: 'Green' | 'Yellow' | 'Red' = 'Green';

    const hasCritical = Object.values(answers).some(a => a.isCritical);

    if (score > 8 || hasCritical) {
      careLevel = 'Red';
    } else if (score > 4) {
      careLevel = 'Yellow';
    }

    setTriageResult({ score, careLevel, symptom: symptom, answers });
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onAnswer={handleAnswer} value={symptom?.toLowerCase()} onSymptomSelect={handleSymptomSelect} />;
      case 2:
        if (questions[0]) {
          return <Step2 onAnswer={handleAnswer} answers={answers} question={questions[0]} symptom={symptom} />;
        }
        return null;
      case 3:
        if (questions[1]) {
          return <Step3 onAnswer={handleAnswer} answers={answers} question={questions[1]} />;
        }
        return null;
      case 4:
        if (questions[2]) {
            return <Step4 onAnswer={handleAnswer} answers={answers} question={questions[2]} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="container relative py-16 md:py-24">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="relative overflow-hidden w-full max-w-2xl mx-auto">
        <div className="relative h-[420px] flex items-center justify-center">
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
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4">
        <div className="container flex justify-between items-center max-w-2xl mx-auto">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {currentStep === totalSteps ? 'Get Results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
