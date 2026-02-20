import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high52: number;
  low52: number;
  sparklineData: number[];
}

interface CompanyCardProps {
  stock: StockData;
}

export default function CompanyCard({ stock }: CompanyCardProps) {
  const [, setLocation] = useLocation();
  const isPositive = stock.changePercent >= 0;

  // Simple sparkline visualization
  const minPrice = Math.min(...stock.sparklineData);
  const maxPrice = Math.max(...stock.sparklineData);
  const range = maxPrice - minPrice || 1;

  return (
    <div
      className="group bg-card/50 backdrop-blur-md border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={() => setLocation(`/company/${stock.ticker}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{stock.name}</h3>
          <p className="text-xs text-muted-foreground">{stock.ticker}</p>
        </div>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-accent/10' : 'bg-destructive/10'}`}>
          {isPositive ? (
            <TrendingUp size={20} className="text-accent" />
          ) : (
            <TrendingDown size={20} className="text-destructive" />
          )}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <p className="text-2xl font-bold mb-1">₹{stock.price.toFixed(2)}</p>
        <div className={`flex items-center gap-2 ${isPositive ? 'text-accent' : 'text-destructive'}`}>
          <span className="font-semibold">
            {isPositive ? '+' : ''}{stock.change.toFixed(2)}
          </span>
          <span className="text-sm">({stock.changePercent.toFixed(2)}%)</span>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div className="mb-4 h-12 flex items-end gap-1">
        {stock.sparklineData.map((price, idx) => {
          const height = ((price - minPrice) / range) * 100 || 50;
          return (
            <div
              key={idx}
              className={`flex-1 rounded-t transition-all ${
                isPositive ? 'bg-accent/60' : 'bg-destructive/60'
              } hover:opacity-100 opacity-70`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <p className="text-muted-foreground mb-1">Market Cap</p>
          <p className="font-semibold">{stock.marketCap}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Volume</p>
          <p className="font-semibold">{stock.volume}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">52W High</p>
          <p className="font-semibold">₹{stock.high52.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">52W Low</p>
          <p className="font-semibold">₹{stock.low52.toFixed(0)}</p>
        </div>
      </div>

      {/* View Details Button */}
      <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
        View Details
        <ArrowRight size={16} className="transition-transform" />
      </button>
    </div>
  );
}
