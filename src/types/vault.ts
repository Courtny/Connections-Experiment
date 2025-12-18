export type SecurityMode = 'solo' | 'network';

export interface VaultSetupState {
  currentStep: 1 | 2 | 3 | 4 | 5;
  securityMode?: SecurityMode;
  networkEnabled: boolean;
  deviceLoadout?: 0 | 1 | 2;
}

export type VaultSetupAction =
  | { type: 'SET_SECURITY_MODE'; payload: SecurityMode }
  | { type: 'SET_DEVICE_LOADOUT'; payload: 0 | 1 | 2 }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' };


