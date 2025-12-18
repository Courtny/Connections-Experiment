import StepShell from '../StepShell';

interface Step1MissionIntroProps {
  onStart: () => void;
}

export default function Step1MissionIntro({ onStart }: Step1MissionIntroProps) {
  return (
    <StepShell
      title="Mission Intro"
      description="Secure your vault with the right strategy for your needs."
    >
      <div className="space-y-6">
        <p className="text-gray-700">
          Protect your digital assets with a comprehensive security setup. Choose to join our network at no cost to receive key share requests, or keep your setup private.
        </p>
        <button
          onClick={onStart}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
        >
          Start Setup
        </button>
      </div>
    </StepShell>
  );
}


