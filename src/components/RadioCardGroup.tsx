interface RadioOption {
  value: string;
  label: string;
  description?: string;
  price?: string;
}

interface RadioCardGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
}

export default function RadioCardGroup({
  name,
  legend,
  options,
  value,
  onChange,
}: RadioCardGroupProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-gray-900 mb-4">{legend}</legend>
      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all
              bg-white shadow-sm
              focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
              ${value === option.value
                ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-start">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex-1">
                <div className="font-semibold text-gray-900">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                )}
                {option.price && (
                  <div className="text-lg font-bold text-gray-900 mt-2">{option.price}</div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}


