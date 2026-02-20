import { X, Filter, TrendingUp, DollarSign } from 'lucide-react';

interface SidebarProps {
  sortBy: 'marketCap' | 'change';
  onSortChange: (sort: 'marketCap' | 'change') => void;
  onClose: () => void;
}

export default function Sidebar({ sortBy, onSortChange, onClose }: SidebarProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <h2 className="font-bold">Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1 hover:bg-secondary rounded transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Sort Section */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={18} />
            Sort By
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onSortChange('marketCap')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'marketCap'
                  ? 'bg-primary text-background font-semibold'
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                Market Cap
              </div>
            </button>
            <button
              onClick={() => onSortChange('change')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'change'
                  ? 'bg-primary text-background font-semibold'
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                Price Change %
              </div>
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Dashboard Info</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Real-time data for Indian NSE/BSE listed real estate companies. Data updates every 5 seconds.
          </p>
        </div>

        {/* Companies List */}
        <div>
          <h3 className="font-semibold mb-3">Companies</h3>
          <div className="space-y-2 text-sm">
            {[
              'DLF Ltd',
              'Lodha Developers',
              'Godrej Properties',
              'Oberoi Realty',
              'Prestige Estates',
              'Brigade Enterprises',
              'Sunteck Realty',
              'Sobha Ltd',
              'Phoenix Mills',
              'Mahindra Lifespace',
            ].map(company => (
              <div
                key={company}
                className="px-3 py-2 rounded hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 text-xs text-muted-foreground">
        <p>Last updated: {new Date().toLocaleTimeString('en-IN')}</p>
      </div>
    </div>
  );
}
