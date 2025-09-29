'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { ProgressBar } from '@/components/triage/progress-bar';
import Step1 from '@/components/triage/step-1';
import Step2 from '@/components/triage/step-2';
import Step3 from '@/components/triage/step-3';
import { Button } from '@/components/ui/button';
import { triageQuestions } from '@/lib/data';

const totalSteps = 3;

export default function TriagePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, { value: number, isCritical?: boolean }>>({});
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const { setTriageResult } = useAuth();

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

  const handleAnswer = (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { value: option.value, isCritical: option.isCritical } }));
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !answers.symptom) return true;
    if (currentStep === 2 && !answers.q1) return true;
    if (currentStep === 3 && (triageQuestions.step3.some(q => !answers[q.id]))) return true;
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

    setTriageResult({ score, careLevel });
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
    <div className="container relative py-16 md:py-24 overflow-x-hidden">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
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
          {currentStep === 1 && <Step1 onAnswer={handleAnswer} value={answers.symptom?.value.toString()} />}
          {currentStep === 2 && <Step2 onAnswer={handleAnswer} answers={answers} />}
          {currentStep === 3 && <Step3 onAnswer={handleAnswer} answers={answers} />}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4">
        <div className="container flex justify-between items-center">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {currentStep === totalSteps ? 'Finish & See Results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
