/**
 * Revenue Chart Configuration
 *
 * Customize your lab token dashboard appearance and behavior here.
 * All colors support hex, rgb, rgba, and named colors.
 */

export const chartConfig = {
  // 🎨 Chart Colors
  colors: {
    // Revenue line (primary metric)
    revenue: {
      line: '#00ff88', // Bright green
      glow: '#00ff88', // Glow effect color
      area: {
        start: 'rgba(0, 255, 136, 0.3)', // Top of gradient
        end: 'rgba(0, 255, 136, 0.1)', // Bottom of gradient
      },
    },

    // Purchase percentage line (secondary metric)
    purchasePercentage: {
      line: '#00ffdd', // Bright teal
      glow: '#00ffdd', // Glow effect color
      // No area fill for percentage line
    },

    // Purchases line (tertiary metric)
    purchases: {
      line: '#ff8800', // Bright orange
      glow: '#ff8800', // Glow effect color
      area: {
        start: 'rgba(255, 136, 0, 0.3)', // Top of gradient
        end: 'rgba(255, 136, 0, 0.1)', // Bottom of gradient
      },
    },

    // UI colors
    background: 'transparent', // Chart background
    text: '#ffffff', // Primary text color
    textSecondary: '#888888', // Secondary text (axes, labels)
    gridLines: '#2a2a2a', // Grid line color
    axisLines: '#444444', // Axis line color
    tooltip: 'rgba(0, 0, 0, 0.8)', // Tooltip background
  },

  // 📏 Chart Dimensions
  dimensions: {
    height: 500, // Chart height in pixels
    marginTop: '15%', // Top margin percentage
    marginBottom: '15%', // Bottom margin percentage
    marginLeft: '3%', // Left margin percentage
    marginRight: '4%', // Right margin percentage
  },

  // ⚡ Animation Settings
  animation: {
    duration: 1000, // Animation duration in ms
    easing: 'cubicOut', // Animation easing function
    enabled: true, // Enable/disable animations
  },

  // 🎛️ Interactive Controls
  controls: {
    slider: {
      enabled: true, // Show time range slider
      height: 20, // Slider height in pixels
      position: 20, // Distance from bottom in pixels
      background: 'rgba(47, 69, 84, 0.3)', // Slider background
    },

    tooltip: {
      enabled: true, // Show tooltips on hover
      trigger: 'axis', // Trigger type ('axis' or 'item')
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#444444',
    },

    legend: {
      enabled: true, // Show legend
      position: 'top', // Legend position
      gap: 20, // Gap between legend items
    },
  },

  // 📊 Data Display Options
  dataDisplay: {
    smoothLines: true, // Use smooth curves
    showSymbols: false, // Show data point markers
    lineWidth: 3, // Line thickness in pixels
    glowIntensity: 10, // Glow blur radius

    // Y-axis formatting
    formatters: {
      revenue: (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
      },
      percentage: (value: number) => `${value.toFixed(1)}%`,
      tooltip: {
        revenue: (value: number) => `${value.toLocaleString()} SOL`,
        purchases: (value: number) => `${value.toLocaleString()} SOL`,
        percentage: (value: number) => `${value.toFixed(1)}%`,
      },
    },
  },

  // 🔄 Data Fetching
  dataFetching: {
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retryCount: 3, // Number of retry attempts
    retryDelay: 1000, // Delay between retries (ms)
  },

  // 📝 Labels and Text
  labels: {
    title: 'Revenue and purchases',
    yAxisLeft: 'Amount (SOL)',
    yAxisRight: 'Percentage (%)',

    // Legend labels
    legend: {
      revenue: 'Revenue (SOL)',
      purchasePercentage: "Purchases as a % of Prev Day's Revenue",
      purchases: 'Purchases (SOL)',
    },

    // Loading and error states
    loading: 'Loading revenue data...',
    error: 'Failed to load revenue data',

    // Disclaimer text
    disclaimer: `Lab.fun currently expects to use substantially all net revenue for strategic investments. 
Lab.fun may modify or discontinue those plans at any time. The $LAB token does not represent 
a right to revenues or any other distribution.`,
  },
};

// 🎨 Predefined Color Themes
export const colorThemes = {
  // Default neon theme (pump.fun inspired)
  neon: {
    revenue: '#00ff88',
    purchasePercentage: '#00ffdd',
    purchases: '#ff8800',
  },

  // Blue ocean theme
  ocean: {
    revenue: '#00a8ff',
    purchasePercentage: '#0078d4',
    purchases: '#005a9d',
  },

  // Purple galaxy theme
  galaxy: {
    revenue: '#8b5cf6',
    purchasePercentage: '#a78bfa',
    purchases: '#c084fc',
  },

  // Red fire theme
  fire: {
    revenue: '#ff6b6b',
    purchasePercentage: '#ff8e53',
    purchases: '#ff6348',
  },

  // Green nature theme
  nature: {
    revenue: '#26d0ce',
    purchasePercentage: '#1dd1a1',
    purchases: '#00d2d3',
  },
};

// 🎯 Utility function to apply color theme
export const applyColorTheme = (themeName: keyof typeof colorThemes) => {
  const theme = colorThemes[themeName];
  return {
    ...chartConfig,
    colors: {
      ...chartConfig.colors,
      revenue: {
        ...chartConfig.colors.revenue,
        line: theme.revenue,
        glow: theme.revenue,
      },
      purchasePercentage: {
        ...chartConfig.colors.purchasePercentage,
        line: theme.purchasePercentage,
        glow: theme.purchasePercentage,
      },
      purchases: {
        ...chartConfig.colors.purchases,
        line: theme.purchases,
        glow: theme.purchases,
      },
    },
  };
};

export default chartConfig;
