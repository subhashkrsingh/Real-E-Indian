import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
}

interface LiveTickerProps {
  stocks: StockData[];
}

export default function LiveTicker({ stocks }: LiveTickerProps) {
  // Duplicate stocks for seamless scrolling
  const tickerStocks = [...stocks, ...stocks];

  return (
    <div className="bg-card border-b border-border overflow-hidden">
      <div className="max-w-full overflow-x-hidden">
        <div className="flex animate-scroll hover:pause-animation">
          {tickerStocks.map((stock, idx) => (
            <div
              key={`${stock.ticker}-${idx}`}
              className="flex items-center gap-4 px-6 py-3 min-w-max hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-sm min-w-24">{stock.ticker}</span>
              <span className="text-sm text-muted-foreground min-w-20">₹{stock.price.toFixed(2)}</span>
              <div className={`flex items-center gap-1 min-w-24 ${
                stock.changePercent >= 0 ? 'text-accent' : 'text-destructive'
              }`}>
                {stock.changePercent >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span className="text-sm font-semibold">{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
