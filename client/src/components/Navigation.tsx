import { TrendingUp } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <TrendingUp size={24} className="text-background" />
          </div>
          <div>
            <h1 className="text-xl font-bold">RE Dashboard</h1>
            <p className="text-xs text-muted-foreground">Indian Real Estate</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:text-primary transition-colors">Dashboard</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">News</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Analysis</a>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-IN')}
          </div>
        </div>
      </div>
    </nav>
  );
}
