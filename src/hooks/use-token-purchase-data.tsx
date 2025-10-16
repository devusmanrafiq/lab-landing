import { useQuery } from '@tanstack/react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { tokenPurchases } from 'pages/home/core/_requests';

/**
 * API Integration for Token Purchase Data
 * Maps your actual API response to chart and table components
 */

// Your actual API response interface
export interface TokenPurchaseApiResponse {
  data: {
    _id: string;
    baseAmount: number; // Amount in LAB tokens
    quoteAmount: number; // Amount in SOL
    quoteAmountUsd: number; // Amount in USD
    price: number; // Price per token
    // Add these if available from your API:
    time?: string; // Purchase timestamp
    dailyRevenuePercent?: number; // % of daily revenue
  }[];
  timeseries: {
    quoteAmount: number; // SOL amount
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
    price: `$${item.price.toFixed(6)}`, // e.g., "$2.278700"
    dailyRevenuePercent: item.dailyRevenuePercent ? `${item.dailyRevenuePercent.toFixed(3)}%` : 'N/A', // You'll need this from API
    revenue: `${formatNumber(item.quoteAmount * 0.95, 2)} SOL`, // Assuming 5% fee
    time: item.time
      ? formatPurchaseTime(item.time)
      : formatPurchaseTime(apiData.timeseries[index]?.time || new Date().toISOString()),
    timestamp: item.time
      ? new Date(item.time).getTime()
      : new Date(apiData.timeseries[index]?.time || Date.now()).getTime(),
  }));
};

// Transform your timeseries data for the Revenue Chart
export const transformApiToRevenueChart = (apiData: TokenPurchaseApiResponse, daysLimit: number = 30) => {
  // Filter timeseries to last N days to avoid overwhelming the chart
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysLimit);

  const recentTimeseries = apiData.timeseries.filter((item) => {
    const itemDate = new Date(item.time);
    return itemDate >= cutoffDate;
  });

  // Group recent timeseries by day to get daily totals
  const dailyData = groupByDay(recentTimeseries);

  const dates: string[] = [];
  const revenue: number[] = [];
  const purchases: number[] = [];
  const purchasePercentages: number[] = [];

  // Sort dates to ensure chronological order
  const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  sortedDates.forEach((date, index) => {
    const dayData = dailyData[date];
    const totalPurchases = dayData.reduce((sum, item) => sum + item.quoteAmount, 0);
    const totalRevenue = totalPurchases * 0.05; // Assuming 5% fee goes to revenue

    // Calculate percentage of previous day (if available)
    const prevRevenue = index > 0 ? revenue[index - 1] : totalRevenue;
    const percentage = prevRevenue > 0 ? (totalPurchases / prevRevenue) * 100 : 100;

    dates.push(formatChartDate(date));
    revenue.push(totalRevenue);
    purchases.push(totalPurchases);
    purchasePercentages.push(Math.min(percentage, 250)); // Cap at 250%
  });

  return {
    dates,
    revenue,
    purchases,
    purchasePercentages,
    totalDataPoints: apiData.timeseries.length,
    filteredDataPoints: recentTimeseries.length,
    dateRange: {
      start: sortedDates[0] || null,
      end: sortedDates[sortedDates.length - 1] || null,
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

const formatChartDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const groupByDay = (timeseries: { quoteAmount: number; time: string }[]) => {
  const groups: { [key: string]: { quoteAmount: number; time: string }[] } = {};

  timeseries.forEach((item) => {
    const date = new Date(item.time).toISOString().split('T')[0]; // YYYY-MM-DD
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
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
  const chartData = data?.data ? transformApiToRevenueChart(data?.data) : null;

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
