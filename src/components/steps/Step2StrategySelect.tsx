import StepShell from '../StepShell';
import SelectableCard from '../SelectableCard';
import type { SecurityMode } from '../../types/vault';

interface Step2StrategySelectProps {
  selectedMode?: SecurityMode;
  onSelect: (mode: SecurityMode) => void;
}

export default function Step2StrategySelect({ selectedMode, onSelect }: Step2StrategySelectProps) {
  return (
    <StepShell
      title="Join the Network"
      description="Choose whether to enable connections"
    >
      <div className="space-y-4">
        <SelectableCard
          isSelected={selectedMode === 'network'}
          onSelect={() => onSelect('network')}
          badge="No Cost"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Network</h3>
              <p className="text-gray-600">
                Opt in to receive key and vault share requests from trusted contacts. You can opt in later if you prefer.
              </p>
            </div>
          </div>
        </SelectableCard>
        
        <SelectableCard
          isSelected={selectedMode === 'solo'}
          onSelect={() => onSelect('solo')}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Private</h3>
              <p className="text-gray-600">
                Keep your setup private. No one can share keys with you, and you maintain complete privacy.
              </p>
            </div>
          </div>
        </SelectableCard>
      </div>
    </StepShell>
  );
}


