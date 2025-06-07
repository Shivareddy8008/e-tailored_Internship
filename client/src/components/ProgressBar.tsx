interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressWidth = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Welcome to ProjectFlow</h1>
        <span className="text-blue-100 text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-blue-400/30 rounded-full h-2">
        <div 
          className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
