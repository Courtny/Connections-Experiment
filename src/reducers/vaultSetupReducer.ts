import type { VaultSetupState, VaultSetupAction } from '../types/vault';

export function vaultSetupReducer(
  state: VaultSetupState,
  action: VaultSetupAction
): VaultSetupState {
  switch (action.type) {
    case 'SET_SECURITY_MODE': {
      const networkEnabled = action.payload === 'network';
      return {
        ...state,
        securityMode: action.payload,
        networkEnabled,
      };
    }
    case 'SET_DEVICE_LOADOUT':
      return {
        ...state,
        deviceLoadout: action.payload,
      };
    case 'NEXT_STEP': {
      const currentStep = state.currentStep;
      
      // Skip step 3 if solo mode
      if (currentStep === 2 && state.securityMode === 'solo') {
        return { ...state, currentStep: 4 };
      }
      
      // Normal progression
      if (currentStep < 5) {
        return { ...state, currentStep: (currentStep + 1) as 1 | 2 | 3 | 4 | 5 };
      }
      return state;
    }
    case 'PREV_STEP': {
      const currentStep = state.currentStep;
      
      // From step 4, go to step 3 if network, else step 2
      if (currentStep === 4) {
        if (state.networkEnabled) {
          return { ...state, currentStep: 3 };
        }
        return { ...state, currentStep: 2 };
      }
      
      // From step 5, go to step 4
      if (currentStep === 5) {
        return { ...state, currentStep: 4 };
      }
      
      // Normal back progression
      if (currentStep > 1) {
        return { ...state, currentStep: (currentStep - 1) as 1 | 2 | 3 | 4 | 5 };
      }
      return state;
    }
    case 'RESET':
      return {
        currentStep: 1,
        networkEnabled: false,
      };
    default:
      return state;
  }
}


