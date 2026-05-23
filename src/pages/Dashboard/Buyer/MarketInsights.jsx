import { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Home, DollarSign, Users, Calendar, ArrowUp, ArrowDown, Search, Filter, Download, Share2 } from 'lucide-react';

const MarketInsights = () => {
  const [marketData, setMarketData] = useState({
    averagePrice: 0,
    priceTrend: 0,
    inventory: 0,
    daysOnMarket: 0,
    salesVolume: 0
  });

  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');

  useEffect(() => {
    // Simulate API calls
    loadMarketData();
    loadNeighborhoodData();
    loadPriceHistory();
  }, []);

  const loadMarketData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMarketData({
      averagePrice: 625000,
      priceTrend: 4.2,
      inventory: 342,
      daysOnMarket: 28,
      salesVolume: 156
    });
  };

  const loadNeighborhoodData = async () => {
    const data = [
      {
        id: 1,
        name: "Downtown",
        averagePrice: 750000,
        priceChange: 5.8,
        inventory: 45,
        daysOnMarket: 22,
        demand: "high"
      },
      {
        id: 2,
        name: "Suburbia Heights",
        averagePrice: 550000,
        priceChange: 3.2,
        inventory: 89,
        daysOnMarket: 35,
        demand: "medium"
      },
      {
        id: 3,
        name: "Riverside",
        averagePrice: 680000,
        priceChange: 6.1,
        inventory: 23,
        daysOnMarket: 18,
        demand: "high"
      },
      {
        id: 4,
        name: "Westside",
        averagePrice: 480000,
        priceChange: 2.1,
        inventory: 156,
        daysOnMarket: 42,
        demand: "low"
      }
    ];
    setNeighborhoods(data);
  };

  const loadPriceHistory = async () => {
    const history = [
      { month: 'Jan 2023', price: 580000 },
      { month: 'Apr 2023', price: 595000 },
      { month: 'Jul 2023', price: 610000 },
      { month: 'Oct 2023', price: 625000 },
      { month: 'Jan 2024', price: 645000 }
    ];
    setPriceHistory(history);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return <ArrowUp className="w-4 h-4 text-success" />;
    } else if (trend < 0) {
      return <ArrowDown className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Market Insights</h1>
          </div>
          <p className="text-muted-foreground">Stay informed with real-time market data and trends</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {['overview', 'neighborhoods', 'trends', 'forecast'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors duration-200 capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Market Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Average Price</div>
                    <div className="text-2xl font-bold text-foreground">{formatCurrency(marketData.averagePrice)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {getTrendIcon(marketData.priceTrend)}
                  <span className={marketData.priceTrend > 0 ? 'text-success' : 'text-destructive'}>
                    {marketData.priceTrend}% YoY
                  </span>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Home className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Active Inventory</div>
                    <div className="text-2xl font-bold text-foreground">{marketData.inventory}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Properties for sale</div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Days on Market</div>
                    <div className="text-2xl font-bold text-foreground">{marketData.daysOnMarket}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Average selling time</div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Sales</div>
                    <div className="text-2xl font-bold text-foreground">{marketData.salesVolume}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Last 30 days</div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Temperature</div>
                    <div className="text-2xl font-bold text-success">Hot</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Seller's Market</div>
              </div>
            </div>

            {/* Charts and Detailed Data */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Price Trend Chart */}
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Price Trend (Last 12 Months)</h2>
                <div className="space-y-4">
                  {priceHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.month}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${((item.price - 550000) / 100000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-card-foreground">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Insights */}
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Key Insights</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="font-medium text-card-foreground mb-1">📈 Prices Rising Steadily</div>
                    <div className="text-sm text-muted-foreground">
                      Home prices have increased 4.2% year-over-year, with strong demand in urban centers.
                    </div>
                  </div>
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="font-medium text-card-foreground mb-1">⚡ Low Inventory</div>
                    <div className="text-sm text-muted-foreground">
                      Active listings are down 12% from last year, creating competitive buying conditions.
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="font-medium text-card-foreground mb-1">🏠 Quick Sales</div>
                    <div className="text-sm text-muted-foreground">
                      Properties are selling 15% faster than last year, averaging 28 days on market.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Neighborhood Analysis */}
        {activeTab === 'neighborhoods' && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">Neighborhood Comparison</h2>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Neighborhood</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Avg Price</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Price Trend</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Inventory</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Days on Market</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neighborhoods
                      .filter(n => selectedNeighborhood === 'all' || n.id.toString() === selectedNeighborhood)
                      .map(neighborhood => (
                        <tr key={neighborhood.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-200">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-medium text-card-foreground">{neighborhood.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right font-medium text-card-foreground">
                            {formatCurrency(neighborhood.averagePrice)}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {getTrendIcon(neighborhood.priceChange)}
                              <span className={neighborhood.priceChange > 0 ? 'text-success' : 'text-destructive'}>
                                {neighborhood.priceChange}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-right text-card-foreground">{neighborhood.inventory}</td>
                          <td className="py-4 text-right text-card-foreground">{neighborhood.daysOnMarket}</td>
                          <td className="py-4 text-right">
                            <span className={`capitalize ${getDemandColor(neighborhood.demand)}`}>
                              {neighborhood.demand}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-end">
          <button className="flex items-center gap-2 px-6 py-3 border border-input rounded-lg font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
            <Share2 className="w-4 h-4" />
            Share Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;