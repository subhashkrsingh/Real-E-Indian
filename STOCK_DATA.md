# Indian Real Estate Stock Dashboard - Stock Data Reference

## Primary Indian Real Estate Companies (NSE Listed)

| Company Name | NSE Ticker | BSE Code | Current Price (INR) | Market Cap | Status |
|---|---|---|---|---|---|
| DLF Ltd | DLF.NS | 532806 | ~639-643 | 1.58T | Active |
| Lodha Developers (Macrotech) | LODHA.NS | 543287 | ~1,096-1,100 | 1.10T | Active |
| Godrej Properties | GODREJPROP.NS | 533150 | ~1,845 | 555B | Active |
| Oberoi Realty | OBEROIRLTY.NS | 532755 | ~1,550 | 564B | Active |
| Prestige Estates Projects | PRESTIGE.NS | 532941 | ~1,525 | TBD | Active |
| Brigade Enterprises | BRIGADE.NS | 532710 | ~742 | 181B | Active |
| Sunteck Realty | SUNTECK.NS | 532850 | ~398 | TBD | Active |
| Sobha Ltd | SOBHA.NS | 532809 | TBD | TBD | Active |
| Phoenix Mills | PHOENIXLTD.NS | 532545 | ~1,773 | TBD | Active |
| Mahindra Lifespace Developers | MAHLIFE.NS | 532720 | TBD | TBD | Active |

## Data Sources

### Free APIs Available
1. **Yahoo Finance API** - Supports NSE stocks with `.NS` suffix
   - Example: `GODREJPROP.NS`, `DLF.NS`, `LODHA.NS`
   - Can fetch historical data, quotes, and basic company info
   
2. **Alpha Vantage** - Limited free tier (5 calls/min)
   - Requires API key
   - Good for OHLC data
   
3. **Rapid API** - Multiple stock data providers
   - Some free tiers available
   - Various Indian stock APIs

4. **NSE India Official** - Limited public API
   - No real-time free API
   - Historical data available

### Recommended Approach for Dashboard
- Use **Yahoo Finance** as primary source (free, no key required)
- Implement mock/cached data for demo purposes
- Use Chart.js for price visualization
- Fetch data on page load and refresh every 60 seconds

## Key Financial Metrics to Display
- Current Price
- Price Change (% and absolute)
- Market Cap
- 52-Week High/Low
- Volume
- P/E Ratio
- EPS
- Dividend Yield

## Implementation Notes
- All prices are in INR (Indian Rupees)
- Market Cap typically shown in Billions (B) or Trillions (T)
- Use `.NS` suffix for NSE stocks in API calls
- Real estate sector is volatile; consider showing 1D, 5D, 1M, 3M, 6M, 1Y charts
