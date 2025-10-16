/**
 * Utility functions for currency conversion and price fetching
 */

// Cache for SOL price to avoid too many API calls
let solPriceCache: { price: number; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch current SOL price in USD
 * Uses CoinGecko API (free tier)
 */
export const fetchSOLPrice = async (): Promise<number> => {
  try {
    // Check cache first
    if (solPriceCache && Date.now() - solPriceCache.timestamp < CACHE_DURATION) {
      return solPriceCache.price;
    }

    // Fetch from CoinGecko API (free)
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');

    if (!response.ok) {
      throw new Error('Failed to fetch SOL price');
    }

    const data = await response.json();
    const price = data.solana?.usd || 150; // Fallback to $150 if API fails

    // Update cache
    solPriceCache = {
      price,
      timestamp: Date.now(),
    };

    return price;
  } catch {
    // Failed to fetch SOL price, using fallback
    return 150; // Fallback price
  }
};

/**
 * Convert SOL amount to USD
 */
export const solToUSD = (solAmount: number, solPrice?: number): number => {
  const price = solPrice || solPriceCache?.price || 150;
  return solAmount * price;
};

/**
 * Format currency values for display
 */
export const formatCurrency = {
  sol: (amount: number): string => {
    return `${amount.toLocaleString()} SOL`;
  },

  usd: (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toLocaleString()}`;
  },

  percentage: (value: number): string => {
    return `${value.toFixed(1)}%`;
  },
};

/**
 * Format date for display
 */
export const formatDate = {
  tooltip: (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  },

  axis: (dateStr: string): string => {
    return dateStr; // Keep MM/DD/YYYY format for axis
  },
};

/**
 * Hook to get current SOL price with automatic updates
 */
export const useSOLPrice = () => {
  const getCurrentPrice = async () => {
    return await fetchSOLPrice();
  };

  return {
    getCurrentPrice,
    getCachedPrice: () => solPriceCache?.price || 150,
  };
};
