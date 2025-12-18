import StepShell from '../StepShell';
import RadioCardGroup from '../RadioCardGroup';
import Accordion from '../Accordion';

interface Step4DeviceLoadoutProps {
  selectedLoadout?: 0 | 1 | 2;
  onSelect: (loadout: 0 | 1 | 2) => void;
  isNetworkMode?: boolean;
}

export default function Step4DeviceLoadout({ selectedLoadout, onSelect, isNetworkMode }: Step4DeviceLoadoutProps) {
  const options = [
    { value: '0', label: '0 Devices', description: 'Single device setup', price: '$0' },
    { value: '1', label: '1 Device', description: '2-of-2 multisig (requires both devices)', price: '$79' },
    { value: '2', label: '2 Devices', description: '2-of-3 multisig (requires 2 of 3 devices)', price: '$158' },
  ];

  const getMultisigExplanation = () => {
    if (selectedLoadout === undefined) {
      return 'Select a device configuration to see your multisig setup.';
    }
    if (selectedLoadout === 0) {
      return 'Single device setup: Your vault requires only this device to access. Simple but less secure if the device is lost.';
    }
    if (selectedLoadout === 1) {
      return '2-of-2 multisig: You need both devices (this one + 1 additional) to access your vault. More secure, but both devices are required.';
    }
    return '2-of-3 multisig: You need any 2 of your 3 devices to access your vault. Maximum security with redundancy—if one device is lost, you can still access your vault with the other two.';
  };

  return (
    <StepShell
      title="Device Loadout"
      description={isNetworkMode 
        ? "Select the number of additional security devices. Network keys, including the Unchained key, can also be used."
        : "Select the number of additional security devices"
      }
    >
      <div className="space-y-6">
        <RadioCardGroup
          name="deviceLoadout"
          legend="Choose your device configuration"
          options={options}
          value={selectedLoadout?.toString()}
          onChange={(value) => onSelect(parseInt(value) as 0 | 1 | 2)}
        />
        
        {selectedLoadout !== undefined && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">Your Multisig Setup</h4>
                <p className="text-sm text-blue-800">{getMultisigExplanation()}</p>
              </div>
            </div>
          </div>
        )}

        <Accordion title="Understanding multisig">
          <div className="space-y-3 text-sm">
            <p>
              Multisig (multi-signature) requires multiple devices to approve transactions, adding an extra layer of security.
              {isNetworkMode && (
                <> Network keys, such as the Unchained key, can also be used as part of your multisig setup.</>
              )}
            </p>
            <div className="space-y-2">
              <div>
                <strong className="text-gray-900">0 Devices (Single):</strong>
                <span className="text-gray-600"> 1-of-1 — Only this device needed. Simple but vulnerable if lost.</span>
              </div>
              <div>
                <strong className="text-gray-900">1 Device (2-of-2):</strong>
                <span className="text-gray-600"> Both devices required. More secure, but no backup if one is lost.</span>
              </div>
              <div>
                <strong className="text-gray-900">2 Devices (2-of-3):</strong>
                <span className="text-gray-600"> Any 2 of 3 devices needed. Maximum security with redundancy.</span>
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    </StepShell>
  );
}


