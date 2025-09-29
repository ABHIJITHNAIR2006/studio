import { Progress } from '@/components/ui/progress';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-14 left-0 w-full z-40 bg-background/80 backdrop-blur-sm pt-4 pb-2">
      <div className="container">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-primary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="w-full h-2 transition-all duration-500" />
      </div>
    </div>
  );
}
