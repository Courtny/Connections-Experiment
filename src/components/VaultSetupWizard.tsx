import { useReducer, useEffect } from 'react';
import type { VaultSetupState } from '../types/vault';
import { vaultSetupReducer } from '../reducers/vaultSetupReducer';
import ProgressDots from './ProgressDots';
import Step1MissionIntro from './steps/Step1MissionIntro';
import Step2StrategySelect from './steps/Step2StrategySelect';
import Step3NetworkConfirmation from './steps/Step3NetworkConfirmation';
import Step4DeviceLoadout from './steps/Step4DeviceLoadout';
import Step5Completion from './steps/Step5Completion';

const STORAGE_KEY = 'vaultSetupState';

const initialState: VaultSetupState = {
  currentStep: 1,
  networkEnabled: false,
};

function loadStateFromStorage(): VaultSetupState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as VaultSetupState;
      // Validate the loaded state
      if (parsed && typeof parsed.currentStep === 'number' && parsed.currentStep >= 1 && parsed.currentStep <= 5) {
        const loadedState: VaultSetupState = {
          ...initialState,
          ...parsed,
          currentStep: parsed.currentStep as 1 | 2 | 3 | 4 | 5,
        };
        // Ensure networkEnabled is consistent with securityMode
        if (loadedState.securityMode === 'network') {
          loadedState.networkEnabled = true;
        } else if (loadedState.securityMode === 'solo') {
          loadedState.networkEnabled = false;
        }
        return loadedState;
      }
    }
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
  }
  return null;
}

function saveStateToStorage(state: VaultSetupState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error);
  }
}

export default function VaultSetupWizard() {
  const [state, dispatch] = useReducer(
    vaultSetupReducer,
    loadStateFromStorage() ?? initialState
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const showStep3 = state.securityMode === 'network';
  const totalSteps = showStep3 ? 5 : 4;

  const handleNext = () => {
    // Validate before proceeding
    if (state.currentStep === 2 && !state.securityMode) {
      return; // Can't proceed without selecting a mode
    }
    if (state.currentStep === 4 && state.deviceLoadout === undefined) {
      return; // Can't proceed without selecting loadout
    }
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  };

  const canContinue = () => {
    switch (state.currentStep) {
      case 1:
        return true; // Always can continue from step 1
      case 2:
        return !!state.securityMode; // Need to select security mode
      case 3:
        return true; // Always can continue from step 3
      case 4:
        return state.deviceLoadout !== undefined; // Need to select loadout
      case 5:
        return true; // Always can continue from step 5
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1MissionIntro onStart={handleNext} />;
      case 2:
        return (
          <Step2StrategySelect
            selectedMode={state.securityMode}
            onSelect={(mode) => dispatch({ type: 'SET_SECURITY_MODE', payload: mode })}
          />
        );
      case 3:
        return <Step3NetworkConfirmation />;
      case 4:
        return (
          <Step4DeviceLoadout
            selectedLoadout={state.deviceLoadout}
            onSelect={(loadout) => dispatch({ type: 'SET_DEVICE_LOADOUT', payload: loadout })}
            isNetworkMode={state.networkEnabled}
          />
        );
      case 5:
        return <Step5Completion state={state} onProceed={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto px-4 mb-4 flex justify-end">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          >
            Reset
          </button>
        </div>
        <ProgressDots
          currentStep={state.currentStep}
          totalSteps={totalSteps}
          showStep3={showStep3}
        />
        
        {renderStep()}

        {/* Navigation buttons */}
        {state.currentStep > 1 && (
          <div className="max-w-2xl mx-auto px-4 flex justify-between gap-4 mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl bg-white shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
            >
              Back
            </button>
            {state.currentStep < 5 && (
              <button
                onClick={handleNext}
                disabled={!canContinue()}
                className={`
                  px-6 py-3 font-semibold rounded-xl transition-all
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${
                    canContinue()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  }
                `}
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

