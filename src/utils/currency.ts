/**
 * Utility functions for currency formatting
 */

/**
 * Format currency values for display
 */
export const formatCurrency = {
  lab: (amount: number): string => {
    return `${amount.toLocaleString()} LAB`;
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
