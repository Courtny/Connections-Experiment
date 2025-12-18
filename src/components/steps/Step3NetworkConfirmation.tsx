import StepShell from '../StepShell';
import Accordion from '../Accordion';
import DotGridCanvas from '../DotGridCanvas';

export default function Step3NetworkConfirmation() {
  return (
    <StepShell
      title="Network Enabled"
      description="You're now part of the network of keys"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <ul className="space-y-3 text-gray-700 flex-1">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You can now receive key share requests</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Others can share their keys with you via email</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You can build vaults with shared keys</span>
            </li>
          </ul>
          
          <div className="flex-shrink-0 md:-mt-20">
            <DotGridCanvas width={256} height={256} className="rounded-full" />
          </div>
        </div>
        
        <Accordion title="Learn more">
          <p className="text-sm">
            When someone shares their key with you, you'll receive a notification. After accepting, you can use their key to build your vault, simplifying setup and reducing complexity.
          </p>
        </Accordion>
      </div>
    </StepShell>
  );
}


