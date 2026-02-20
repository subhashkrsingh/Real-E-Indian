import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Menu, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import LiveTicker from '@/components/LiveTicker';
import CompanyCard from '@/components/CompanyCard';
import Sidebar from '@/components/Sidebar';

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

// Mock data for Indian real estate companies
const MOCK_STOCKS: StockData[] = [
  {
    ticker: 'DLF.NS',
    name: 'DLF Ltd',
    price: 643.80,
    change: 17.80,
    changePercent: 2.84,
    marketCap: '1.59T',
    volume: '2.3M',
    high52: 850.00,
    low52: 480.00,
    sparklineData: [620, 625, 630, 628, 635, 640, 643.80],
  },
  {
    ticker: 'LODHA.NS',
    name: 'Lodha Developers',
    price: 1097.90,
    change: 24.50,
    changePercent: 2.28,
    marketCap: '1.10T',
    volume: '1.8M',
    high52: 1200.00,
    low52: 750.00,
    sparklineData: [1050, 1060, 1070, 1080, 1090, 1095, 1097.90],
  },
  {
    ticker: 'GODREJPROP.NS',
    name: 'Godrej Properties',
    price: 1845.10,
    change: 12.40,
    changePercent: 0.68,
    marketCap: '555.8B',
    volume: '746K',
    high52: 2506.50,
    low52: 1475.00,
    sparklineData: [1820, 1825, 1830, 1835, 1840, 1843, 1845.10],
  },
  {
    ticker: 'OBEROIRLTY.NS',
    name: 'Oberoi Realty',
    price: 1564.10,
    change: 16.70,
    changePercent: 1.08,
    marketCap: '564.0B',
    volume: '1.2M',
    high52: 1800.00,
    low52: 1100.00,
    sparklineData: [1540, 1545, 1550, 1555, 1560, 1562, 1564.10],
  },
  {
    ticker: 'PRESTIGE.NS',
    name: 'Prestige Estates',
    price: 1527.80,
    change: 8.70,
    changePercent: 0.57,
    marketCap: '563.0B',
    volume: '1.5M',
    high52: 1750.00,
    low52: 1200.00,
    sparklineData: [1510, 1515, 1520, 1522, 1525, 1526, 1527.80],
  },
  {
    ticker: 'BRIGADE.NS',
    name: 'Brigade Enterprises',
    price: 742.65,
    change: -5.10,
    changePercent: -0.68,
    marketCap: '181.6B',
    volume: '2.1M',
    high52: 950.00,
    low52: 600.00,
    sparklineData: [760, 755, 750, 748, 745, 743, 742.65],
  },
  {
    ticker: 'SUNTECK.NS',
    name: 'Sunteck Realty',
    price: 398.20,
    change: -0.44,
    changePercent: -0.11,
    marketCap: '97.5B',
    volume: '56.9K',
    high52: 478.75,
    low52: 347.00,
    sparklineData: [405, 402, 400, 399, 398.5, 398.3, 398.20],
  },
  {
    ticker: 'SOBHA.NS',
    name: 'Sobha Ltd',
    price: 1214.80,
    change: 11.00,
    changePercent: 0.91,
    marketCap: '298.0B',
    volume: '1.3M',
    high52: 1350.00,
    low52: 850.00,
    sparklineData: [1200, 1205, 1210, 1212, 1213, 1214, 1214.80],
  },
  {
    ticker: 'PHOENIXLTD.NS',
    name: 'Phoenix Mills',
    price: 1773.40,
    change: 38.50,
    changePercent: 2.22,
    marketCap: '155.0B',
    volume: '62.1K',
    high52: 2100.00,
    low52: 1400.00,
    sparklineData: [1730, 1740, 1750, 1760, 1770, 1772, 1773.40],
  },
  {
    ticker: 'MAHLIFE.NS',
    name: 'Mahindra Lifespace',
    price: 1214.80,
    change: 11.00,
    changePercent: 0.91,
    marketCap: '298.0B',
    volume: '890K',
    high52: 1400.00,
    low52: 900.00,
    sparklineData: [1200, 1205, 1210, 1212, 1213, 1214, 1214.80],
  },
];

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>(MOCK_STOCKS);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>(MOCK_STOCKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'marketCap' | 'change'>('marketCap');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle search
  useEffect(() => {
    let filtered = stocks.filter(stock =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    if (sortBy === 'change') {
      filtered.sort((a, b) => b.changePercent - a.changePercent);
    } else {
      filtered.sort((a, b) => {
        const capA = parseInt(a.marketCap.replace(/[BT]/g, '')) * (a.marketCap.includes('T') ? 1000 : 1);
        const capB = parseInt(b.marketCap.replace(/[BT]/g, '')) * (b.marketCap.includes('T') ? 1000 : 1);
        return capB - capA;
      });
    }

    setFilteredStocks(filtered);
  }, [searchTerm, sortBy, stocks]);

  // Simulate price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 5,
          change: stock.change + (Math.random() - 0.5) * 2,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Live Ticker */}
      <LiveTicker stocks={stocks} />

      {/* Main Content */}
      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 md:z-0 w-64 bg-card border-r border-border transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Dashboard */}
        <div className="flex-1 p-4 md:p-6">
          {/* Header with Search */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Real Estate Dashboard</h1>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search companies or tickers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Total Companies</p>
              <p className="text-2xl font-bold">{filteredStocks.length}</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Gainers</p>
              <p className="text-2xl font-bold text-accent">
                {filteredStocks.filter(s => s.changePercent > 0).length}
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Losers</p>
              <p className="text-2xl font-bold text-destructive">
                {filteredStocks.filter(s => s.changePercent < 0).length}
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Avg Change</p>
              <p className={`text-2xl font-bold ${
                filteredStocks.reduce((sum, s) => sum + s.changePercent, 0) / filteredStocks.length > 0
                  ? 'text-accent'
                  : 'text-destructive'
              }`}>
                {(filteredStocks.reduce((sum, s) => sum + s.changePercent, 0) / filteredStocks.length).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map(stock => (
              <CompanyCard key={stock.ticker} stock={stock} />
            ))}
          </div>

          {/* Empty State */}
          {filteredStocks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No companies found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
