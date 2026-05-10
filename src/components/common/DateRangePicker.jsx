import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const presetRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This month', value: 'month' },
  { label: 'Last month', value: 'last_month' },
  { label: 'This year', value: 'year' },
];

export default function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState({
    start: '',
    end: ''
  });

  const handlePresetSelect = (range) => {
    setSelectedRange(range);
    setIsOpen(false);
    console.log('Selected date range:', range);
  };

  const handleCustomRangeApply = () => {
    if (customRange.start && customRange.end) {
      setIsOpen(false);
      // Handle custom range selection
      console.log('Custom date range:', customRange);
    }
  };

  const getDisplayText = () => {
    const preset = presetRanges.find(range => range.value === selectedRange);
    return preset ? preset.label : 'Custom Range';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors"
      >
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{getDisplayText()}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          {/* Preset Ranges */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Preset Ranges</h4>
            <div className="grid grid-cols-2 gap-2">
              {presetRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handlePresetSelect(range.value)}
                  className={`px-3 py-2 text-sm rounded-md text-left transition-colors ${
                    selectedRange === range.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Range */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Custom Range</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">From</label>
                <input
                  type="date"
                  value={customRange.start}
                  onChange={(e) => setCustomRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">To</label>
                <input
                  type="date"
                  value={customRange.end}
                  onChange={(e) => setCustomRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleCustomRangeApply}
                disabled={!customRange.start || !customRange.end}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Custom Range
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}