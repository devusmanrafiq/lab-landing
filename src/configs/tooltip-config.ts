/**
 * Tooltip configuration and styling for the revenue chart
 */

export interface TooltipData {
  date: string;
  revenue: number;
  purchases: number;
  purchasePercentage: number;
  prevRevenue: number;
  solPrice: number;
}

/**
 * Generate tooltip HTML content
 */
export const generateTooltipHTML = (data: TooltipData): string => {
  const { date, revenue, purchases, purchasePercentage, prevRevenue, solPrice } = data;

  const purchaseUSD = purchases * solPrice;
  const dateStr = new Date(date).toISOString().split('T')[0];

  return `
    <div style="
      background: rgba(0, 0, 0, 0.95); 
      border: 1px solid #444; 
      border-radius: 8px; 
      padding: 16px; 
      min-width: 280px;
      font-family: 'Inter', sans-serif;
      line-height: 1.4;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    ">
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #ffffff;">
        ${date}
      </div>
      
      <div style="margin-bottom: 8px;">
        <span style="color: #00ff88; font-size: 14px;">●</span>
        <span style="color: #ffffff; margin-left: 8px;">Revenue: ${revenue.toLocaleString()} SOL</span>
      </div>
      
      <div style="margin-bottom: 8px;">
        <span style="color: #00ffdd; font-size: 14px;">●</span>
        <span style="color: #ffffff; margin-left: 8px;">Purchases %: ${purchasePercentage.toFixed(1)}%</span>
      </div>
      
      <div style="margin-bottom: 12px;">
        <span style="color: #ff8800; font-size: 14px;">●</span>
        <span style="color: #ffffff; margin-left: 8px;">Purchases: ${purchases.toLocaleString()} SOL</span>
      </div>
      
      <hr style="border: none; border-top: 1px solid #444; margin: 12px 0;">
      
      <div style="color: #888888; font-size: 13px;">
        <div style="margin-bottom: 4px;">
          <strong>Purchase Date:</strong> ${dateStr}
        </div>
        <div style="margin-bottom: 4px;">
          <strong>Revenue (Prev Day):</strong> ${prevRevenue.toLocaleString()} SOL
        </div>
        <div style="margin-bottom: 4px;">
          <strong>Purchase % of Prev Day:</strong> ${purchasePercentage.toFixed(1)}%
        </div>
        <div style="margin-bottom: 4px;">
          <strong>Purchase SOL:</strong> ${purchases.toLocaleString()} SOL
        </div>
        <div>
          <strong>Purchase USD:</strong> $${purchaseUSD.toLocaleString()}
        </div>
      </div>
    </div>
  `;
};

/**
 * Tooltip styling configuration
 */
export const tooltipConfig = {
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  borderColor: '#444444',
  borderRadius: '8px',
  padding: '16px',
  minWidth: '280px',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '1.4',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',

  // Colors for different data series
  colors: {
    revenue: '#00ff88',
    purchasePercentage: '#00ffdd',
    purchases: '#ff8800',
  },

  // Text styles
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '12px',
    color: '#ffffff',
  },

  item: {
    marginBottom: '8px',
    color: '#ffffff',
  },

  detail: {
    color: '#888888',
    fontSize: '13px',
    marginBottom: '4px',
  },

  separator: {
    border: 'none',
    borderTop: '1px solid #444',
    margin: '12px 0',
  },
};
