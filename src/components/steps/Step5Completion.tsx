import { useState } from 'react';
import StepShell from '../StepShell';
import SummaryRow from '../SummaryRow';
import type { VaultSetupState } from '../../types/vault';

interface Step5CompletionProps {
  state: VaultSetupState;
  onProceed: () => void;
}

export default function Step5Completion({ state, onProceed }: Step5CompletionProps) {
  const [saved, setSaved] = useState(false);

  const handleProceed = () => {
    console.log('Final vault setup state:', state);
    setSaved(true);
    onProceed();
  };

  const getSecurityModeLabel = (mode?: string) => {
    return mode === 'network' ? 'Network' : mode === 'solo' ? 'Solo' : 'Not selected';
  };

  const getDeviceLoadoutLabel = (loadout?: number) => {
    if (loadout === undefined) return 'Not selected';
    return `${loadout} Device${loadout !== 1 ? 's' : ''}`;
  };

  const getTotalPrice = () => {
    const devicePrice = (state.deviceLoadout ?? 0) * 79;
    return `$${devicePrice}`;
  };

  return (
    <StepShell
      title="Vault Security Configured"
      description="Review your configuration and proceed"
    >
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-green-900">Setup Complete</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Summary</h3>
          <div className="space-y-2">
            <SummaryRow label="Security Mode" value={getSecurityModeLabel(state.securityMode)} />
            <SummaryRow label="Device Loadout" value={getDeviceLoadoutLabel(state.deviceLoadout)} />
            <SummaryRow label="Total Price" value={getTotalPrice()} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
          >
            Proceed
          </button>
          {saved && (
            <span className="text-green-600 font-medium">Saved for checkout</span>
          )}
        </div>
      </div>
    </StepShell>
  );
}


