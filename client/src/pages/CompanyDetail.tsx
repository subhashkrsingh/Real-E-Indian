import { useLocation } from 'wouter';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Users, Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface RouteParams {
  ticker: string;
}

// Mock detailed data for companies
const COMPANY_DETAILS: Record<string, any> = {
  'DLF.NS': {
    name: 'DLF Ltd',
    ticker: 'DLF.NS',
    price: 643.80,
    change: 17.80,
    changePercent: 2.84,
    marketCap: '1.59T',
    peRatio: 28.5,
    eps: 22.56,
    dividendYield: 1.2,
    about: 'DLF Limited is one of India\'s leading real estate developers with a presence across residential, commercial, and retail segments. The company has delivered over 200 million sq. ft. of space and has a strong pipeline of projects.',
    financials: {
      revenue: '₹12,450 Cr',
      netProfit: '₹2,850 Cr',
      debt: '₹8,500 Cr',
      cash: '₹3,200 Cr',
    },
    news: [
      'DLF launches new residential project in Gurugram',
      'Q3 FY26 results show 15% growth in bookings',
      'DLF receives green building certification',
    ],
  },
  'LODHA.NS': {
    name: 'Lodha Developers',
    ticker: 'LODHA.NS',
    price: 1097.90,
    change: 24.50,
    changePercent: 2.28,
    marketCap: '1.10T',
    peRatio: 32.1,
    eps: 34.21,
    dividendYield: 0.8,
    about: 'Macrotech Developers Limited (Lodha Group) is a leading real estate developer in India with a focus on residential and commercial projects. Known for premium developments in Mumbai and other major cities.',
    financials: {
      revenue: '₹15,200 Cr',
      netProfit: '₹3,400 Cr',
      debt: '₹6,800 Cr',
      cash: '₹4,500 Cr',
    },
    news: [
      'Lodha completes 50% of Mumbai South project',
      'Record pre-launches in Q3 FY26',
      'Lodha expands to Bangalore market',
    ],
  },
  'GODREJPROP.NS': {
    name: 'Godrej Properties',
    ticker: 'GODREJPROP.NS',
    price: 1845.10,
    change: 12.40,
    changePercent: 0.68,
    marketCap: '555.8B',
    peRatio: 35.08,
    eps: 52.60,
    dividendYield: 0.5,
    about: 'Godrej Properties Limited is a premium real estate developer with a strong presence in residential and commercial segments. The company is known for its quality constructions and sustainable practices.',
    financials: {
      revenue: '₹37,950 Cr',
      netProfit: '₹15,820 Cr',
      debt: '₹5,200 Cr',
      cash: '₹9,030 Cr',
    },
    news: [
      'Godrej Properties Q3 FY26 profit surges 40%',
      'New luxury project launched in Pune',
      'Godrej achieves record booking value',
    ],
  },
  'OBEROIRLTY.NS': {
    name: 'Oberoi Realty',
    ticker: 'OBEROIRLTY.NS',
    price: 1564.10,
    change: 16.70,
    changePercent: 1.08,
    marketCap: '564.0B',
    peRatio: 38.2,
    eps: 40.95,
    dividendYield: 0.6,
    about: 'Oberoi Realty Limited is a leading real estate developer focused on premium residential and commercial projects in Mumbai. The company has a strong track record of delivering quality projects.',
    financials: {
      revenue: '₹8,500 Cr',
      netProfit: '₹1,680 Cr',
      debt: '₹3,200 Cr',
      cash: '₹2,100 Cr',
    },
    news: [
      'Oberoi Realty announces new Mumbai project',
      'Q3 FY26 sales cross ₹2,000 Cr',
      'Oberoi expands commercial portfolio',
    ],
  },
};

export default function CompanyDetail() {
  const [location, setLocation] = useLocation();
  const ticker = (location.match(/\/company\/(.+)/) || [])[1];
  const company = COMPANY_DETAILS[ticker] || COMPANY_DETAILS['DLF.NS'];
  const isPositive = company.changePercent >= 0;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-muted-foreground">{company.ticker}</p>
            </div>
            <div className={`text-right ${isPositive ? 'text-accent' : 'text-destructive'}`}>
              <p className="text-4xl font-bold">₹{company.price.toFixed(2)}</p>
              <div className="flex items-center justify-end gap-1 mt-2">
                {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="text-lg font-semibold">
                  {isPositive ? '+' : ''}{company.change.toFixed(2)} ({company.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Market Cap</p>
              <p className="text-xl font-bold">{company.marketCap}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">P/E Ratio</p>
              <p className="text-xl font-bold">{company.peRatio}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">EPS</p>
              <p className="text-xl font-bold">₹{company.eps.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Dividend Yield</p>
              <p className="text-xl font-bold">{company.dividendYield}%</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & News */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 size={24} />
                About Company
              </h2>
              <p className="text-muted-foreground leading-relaxed">{company.about}</p>
            </div>

            {/* Latest News Section */}
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={24} />
                Latest News
              </h2>
              <div className="space-y-3">
                {company.news.map((newsItem: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-secondary/30 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <p className="font-semibold mb-1">{newsItem}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Financials */}
          <div>
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users size={24} />
                Key Financials
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Revenue (TTM)</p>
                  <p className="text-xl font-bold">{company.financials.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Net Profit (TTM)</p>
                  <p className="text-xl font-bold text-accent">{company.financials.netProfit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Debt</p>
                  <p className="text-xl font-bold">{company.financials.debt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Cash & Equivalents</p>
                  <p className="text-xl font-bold text-accent">{company.financials.cash}</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-6 bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-lg transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/60 bg-card/30 mt-10">
        <p className="px-4 md:px-6 py-4 text-center text-xs md:text-sm text-muted-foreground">
          © {currentYear} Indian Real Estate Dashboard - SubhashKrSingh. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
