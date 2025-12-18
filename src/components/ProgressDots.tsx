interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  showStep3: boolean;
}

const stepLabels = ['Intro', 'Strategy', 'Network', 'Devices', 'Complete'];

export default function ProgressDots({ currentStep, showStep3 }: ProgressDotsProps) {
  const allSteps = [1, 2, 3, 4, 5];
  
  // Check if a step should be highlighted
  const isStepActive = (step: number): boolean => {
    if (showStep3) {
      return currentStep >= step;
    } else {
      // When step 3 is skipped, map steps correctly
      if (step <= 2) return currentStep >= step;
      if (step === 3) return false; // Step 3 is skipped
      if (step === 4) return currentStep >= 4;
      if (step === 5) return currentStep >= 5;
      return false;
    }
  };
  
  const isStepCompleted = (step: number): boolean => {
    if (showStep3) {
      return currentStep > step;
    } else {
      // When step 3 is skipped
      if (step <= 2) return currentStep > step;
      if (step === 3) return currentStep > 3; // Mark as completed if we're past it
      if (step === 4) return currentStep > 4;
      if (step === 5) return currentStep > 5;
      return false;
    }
  };

  const isStepSkipped = (step: number): boolean => {
    return step === 3 && !showStep3;
  };
  
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        {allSteps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${isStepSkipped(step)
                    ? 'bg-gray-200 border-2 border-dashed border-gray-400'
                    : isStepActive(step)
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                  }
                `}
                aria-label={`Step ${step}`}
              />
              <span className={`hidden md:block text-xs mt-2 transition-colors ${
                isStepSkipped(step)
                  ? 'text-gray-400'
                  : isStepActive(step)
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500'
              }`}>
                {isStepSkipped(step) ? 'Skipped' : stepLabels[step - 1]}
              </span>
            </div>
            {index < allSteps.length - 1 && (
              <div
                className={`
                  w-8 md:w-12 h-0.5 mx-1 transition-all
                  ${isStepCompleted(step)
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

