import { useQuery } from '@tanstack/react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { tokenPurchases } from 'pages/home/core/_requests';

export interface TokenPurchaseApiResponse {
  data: {
    _id: string;
    baseAmount: number; // Amount in LAB tokens
    quoteAmount: number; // Amount in BNB
    quoteAmountUsd: number; // Amount in USD
    price: number; // Price per token
    // Add these if available from your API:
    time?: string; // Purchase timestamp
    dailyRevenuePercent?: number; // % of daily revenue
  }[];
  timeseries: {
    quoteAmount: number; // BNB amount
    time: string; // ISO timestamp
  }[];
  totalCount: number;
  totalBaseAmount: number;
  totalQuoteAmountUsd: number;
  totalCirculatingSupply: number;
}

// Transform your API data for the Purchase Table
export const transformApiToPurchaseTable = (apiData: TokenPurchaseApiResponse) => {
  return apiData.data.map((item, index) => ({
    id: item._id,
    amountPump: formatTokenAmount(item.baseAmount), // e.g., "8.6K" or "8.6M"
    amountSol: formatNumber(item.quoteAmount, 2), // e.g., "19,680.32"
    amountUsd: formatNumber(item.quoteAmountUsd, 2), // e.g., "68,668.65"
    price: `$${item.price.toFixed(3)}`, // e.g., "$2.278700"
    time: item.time
      ? formatPurchaseTime(item.time)
      : formatPurchaseTime(apiData.timeseries[index]?.time || new Date().toISOString()),
    timestamp: item.time
      ? new Date(item.time).getTime()
      : new Date(apiData.timeseries[index]?.time || Date.now()).getTime(),
  }));
};

// Transform your timeseries data for the Purchase Chart (now using hourly data)
export const transformApiToPurchaseChart = (apiData: TokenPurchaseApiResponse, daysLimit: number = 7) => {
  // Filter timeseries to last N days to avoid overwhelming the chart (reduced default for hourly data)
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysLimit);

  const recentTimeseries = apiData.timeseries.filter((item) => {
    const itemDate = new Date(item.time);
    return itemDate >= cutoffDate;
  });

  // Group recent timeseries by hour to get hourly totals
  const hourlyData = groupByHour(recentTimeseries);

  const dates: string[] = [];
  const purchases: number[] = [];

  // Sort hour keys to ensure chronological order
  const sortedHours = Object.keys(hourlyData).sort((a, b) => {
    // Convert YYYY-MM-DD-HH format back to Date for comparison
    const dateA = new Date(a.replace(/-(\d{2})$/, 'T$1:00:00'));
    const dateB = new Date(b.replace(/-(\d{2})$/, 'T$1:00:00'));
    return dateA.getTime() - dateB.getTime();
  });

  sortedHours.forEach((hourKey) => {
    const hourData = hourlyData[hourKey];
    // Since we want to show LAB token purchases, we need to calculate LAB amounts from the individual transactions
    // For now, we'll use quoteAmount (BNB) but we need to clarify what should be displayed
    const totalPurchases = hourData.reduce((sum, item) => sum + item.quoteAmount, 0);

    dates.push(formatChartDateHourly(hourKey));
    purchases.push(totalPurchases);
  });

  return {
    dates,
    purchases,
    totalDataPoints: apiData.timeseries.length,
    filteredDataPoints: recentTimeseries.length,
    dateRange: {
      start: sortedHours[0] || null,
      end: sortedHours[sortedHours.length - 1] || null,
    },
  };
}; // Helper functions
const formatTokenAmount = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toFixed(2);
};

const formatNumber = (num: number, decimals: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatPurchaseTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// BACKUP: Daily date formatting function (saved for future restoration)
// const formatChartDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
// };

// NEW: Hourly date formatting function
const formatChartDateHourly = (hourKeyString: string): string => {
  // Convert YYYY-MM-DD-HH format to readable format
  const [year, month, day, hour] = hourKeyString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour));

  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:00`;
};

// BACKUP: Daily grouping function (saved for future restoration)
// const groupByDay = (timeseries: { quoteAmount: number; time: string }[]) => {
//   const groups: { [key: string]: { quoteAmount: number; time: string }[] } = {};

//   timeseries.forEach((item) => {
//     const date = new Date(item.time).toISOString().split('T')[0]; // YYYY-MM-DD
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(item);
//   });

//   return groups;
// };

// NEW: Hourly grouping function
const groupByHour = (timeseries: { quoteAmount: number; time: string }[]) => {
  const groups: { [key: string]: { quoteAmount: number; time: string }[] } = {};

  timeseries.forEach((item) => {
    const date = new Date(item.time);
    // Group by YYYY-MM-DD-HH format for hourly grouping
    const hourKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}`;
    if (!groups[hourKey]) {
      groups[hourKey] = [];
    }
    groups[hourKey].push(item);
  });

  return groups;
};

// React Hook to use your API data
export const useTokenPurchaseData = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERIES_KEYS.TOKEN_PURCHASES],
    queryFn: () => tokenPurchases(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const tableData = data?.data ? transformApiToPurchaseTable(data?.data) : [];
  const chartData = data?.data ? transformApiToPurchaseChart(data?.data) : null;

  return {
    tableData,
    chartData,
    isLoading: isPending,
    error,
    totalStats: data?.data
      ? {
          totalCount: data?.data.totalCount,
          totalBaseAmount: data?.data.totalBaseAmount,
          totalQuoteAmountUsd: data?.data.totalQuoteAmountUsd,
          totalCirculatingSupply: data?.data.totalCirculatingSupply,
        }
      : null,
  };
};
