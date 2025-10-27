import { useTypography } from '../hooks/useTypography';
import { Heading, Body, Label } from './Typography';

/**
 * Typography Settings Component
 * Provides user controls for typography accessibility preferences
 */
const TypographySettings = ({ className = '' }) => {
  const { preferences, updatePreference, resetPreferences } = useTypography();

  return (
    <div className={`p-6 bg-color-bg-secondary rounded-lg ${className}`}>
      <Heading as="h3" size="lg" className="mb-4">
        Typography Settings
      </Heading>
      
      <Body className="mb-6 text-color-text-secondary">
        Customize the text display to improve readability and accessibility.
      </Body>

      <div className="space-y-6">
        {/* Dyslexic Font Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="block mb-1">Dyslexic-Friendly Font</Label>
            <Body size="sm" className="text-color-text-secondary">
              Use OpenDyslexic font for better readability
            </Body>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.dyslexicFont}
              onChange={(e) => updatePreference('dyslexicFont', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-color-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-color-interactive-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-interactive-primary"></div>
          </label>
        </div>

        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="block mb-1">High Contrast</Label>
            <Body size="sm" className="text-color-text-secondary">
              Increase contrast for better visibility
            </Body>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) => updatePreference('highContrast', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-color-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-color-interactive-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-interactive-primary"></div>
          </label>
        </div>

        {/* Font Size Selection */}
        <div>
          <Label className="block mb-3">Font Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'small', label: 'Small', description: '87.5%' },
              { value: 'normal', label: 'Normal', description: '100%' },
              { value: 'large', label: 'Large', description: '112.5%' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updatePreference('fontSize', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  preferences.fontSize === option.value
                    ? 'border-color-interactive-primary bg-color-interactive-primary/10'
                    : 'border-color-neutral-300 hover:border-color-interactive-primary/50'
                }`}
              >
                <Body size="sm" weight="medium" className="block">
                  {option.label}
                </Body>
                <Body size="xs" className="text-color-text-secondary">
                  {option.description}
                </Body>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t border-color-neutral-200">
          <button
            onClick={resetPreferences}
            className="w-full py-2 px-4 text-color-text-secondary hover:text-color-text-primary border border-color-neutral-300 hover:border-color-neutral-400 rounded-lg transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Preview Text */}
      <div className="mt-6 p-4 bg-color-bg-primary rounded-lg">
        <Label className="block mb-2">Preview</Label>
        <Heading as="h4" size="lg" className="mb-2">
          Sample Heading Text
        </Heading>
        <Body>
          This is a sample paragraph to preview your typography settings. 
          CareSpot Initiative transforms lives through healthcare access and education.
        </Body>
      </div>
    </div>
  );
};

export default TypographySettings;