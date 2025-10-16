/**
 * TypeScript interfaces for Purchase Table data
 */

export interface PurchaseData {
  id: number | string;
  amountPump: string; // e.g., "290.2M"
  amountSol: string; // e.g., "5,713.17"
  amountUsd: string; // e.g., "1,158,507.17"
  price: string; // e.g., "$0.003992"
  dailyRevenuePercent: string; // e.g., "104.030%"
  revenue: string; // e.g., "5,491.82 SOL"
  time: string; // e.g., "Oct 15, 2025"
  timestamp?: number; // Unix timestamp for sorting
}

export interface PurchaseTableProps {
  purchases?: PurchaseData[];
  isLoading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

// Raw API response interface (adjust based on your actual API)
export interface PurchaseApiResponse {
  data: {
    id: string;
    amount_pump: number;
    amount_sol: number;
    amount_usd: number;
    price_usd: number;
    daily_revenue_percent: number;
    revenue_sol: number;
    created_at: string; // ISO date string
  }[];
  total: number;
  page: number;
  hasMore: boolean;
}

// Utility function to transform API data to component format
export const transformPurchaseData = (apiData: PurchaseApiResponse['data']): PurchaseData[] => {
  return apiData.map((item) => ({
    id: item.id,
    amountPump: formatNumber(item.amount_pump, 'M'), // e.g., "290.2M"
    amountSol: formatNumber(item.amount_sol, 'decimal'), // e.g., "5,713.17"
    amountUsd: formatNumber(item.amount_usd, 'decimal'), // e.g., "1,158,507.17"
    price: `$${item.price_usd.toFixed(6)}`, // e.g., "$0.003992"
    dailyRevenuePercent: `${item.daily_revenue_percent.toFixed(3)}%`, // e.g., "104.030%"
    revenue: `${formatNumber(item.revenue_sol, 'decimal')} SOL`, // e.g., "5,491.82 SOL"
    time: formatDate(item.created_at), // e.g., "Oct 15, 2025"
    timestamp: new Date(item.created_at).getTime(),
  }));
};

// Number formatting utilities
const formatNumber = (num: number, type: 'M' | 'decimal'): string => {
  if (type === 'M') {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  }

  if (type === 'decimal') {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return num.toString();
};

// Date formatting utility
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Table column configuration
export const tableColumns = [
  {
    key: 'amountPump',
    label: 'Amount (PUMP)',
    className: 'text-white font-medium',
    sortable: true,
  },
  {
    key: 'amountSol',
    label: 'Amount (SOL)',
    className: 'text-white',
    sortable: true,
  },
  {
    key: 'amountUsd',
    label: 'Amount (USD)',
    className: 'text-white',
    sortable: true,
  },
  {
    key: 'price',
    label: 'Price',
    className: 'text-emerald-400 font-medium',
    sortable: true,
  },
  {
    key: 'dailyRevenuePercent',
    label: '% of Daily Revenue',
    className: 'text-white',
    sortable: true,
  },
  {
    key: 'revenue',
    label: 'Revenue',
    className: 'text-white',
    sortable: true,
  },
  {
    key: 'time',
    label: 'Time',
    className: 'text-gray-400',
    sortable: true,
  },
] as const;
