import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  purchases: number;
  purchasePercentage: number;
  timestamp: number;
}

export interface RevenueApiResponse {
  data: RevenueDataPoint[];
  totalRevenue: number;
  totalPurchases: number;
  averagePercentage: number;
}

// Mock API function - replace with your actual API endpoint
const fetchRevenueData = async (): Promise<RevenueApiResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate sample data - replace this with your actual API call
  const data: RevenueDataPoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  let totalRevenue = 0;
  let totalPurchases = 0;
  let totalPercentage = 0;

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    // Generate realistic looking data with some peaks and valleys
    const baseRevenue = 5000 + Math.sin(i * 0.3) * 2000 + Math.random() * 3000;
    const basePurchases = 3000 + Math.sin(i * 0.4) * 1500 + Math.random() * 2000;
    const percentage = 80 + Math.sin(i * 0.2) * 40 + Math.random() * 60;

    const revenue = Math.max(0, baseRevenue);
    const purchases = Math.max(0, basePurchases);
    const purchasePercentage = Math.max(0, Math.min(250, percentage));

    totalRevenue += revenue;
    totalPurchases += purchases;
    totalPercentage += purchasePercentage;

    data.push({
      date: formattedDate,
      revenue,
      purchases,
      purchasePercentage,
      timestamp: currentDate.getTime(),
    });
  }

  return {
    data,
    totalRevenue,
    totalPurchases,
    averagePercentage: totalPercentage / 30,
  };
};

const useRevenueData = () => {
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const query = useQuery({
    queryKey: ['revenue-data', dateRange],
    queryFn: fetchRevenueData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const filteredData = query.data?.data.filter((item) => {
    if (!dateRange) return true;
    const itemDate = new Date(item.timestamp);
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return {
    ...query,
    data: query.data
      ? {
          ...query.data,
          data: filteredData || [],
        }
      : undefined,
    setDateRange,
    dateRange,
  };
};

export default useRevenueData;

// Real API integration example - uncomment and modify when you have your backend ready
/*
const fetchRevenueDataFromAPI = async (): Promise<RevenueApiResponse> => {
  const response = await fetch('/api/revenue-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add your authentication headers here
      // 'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch revenue data');
  }

  return response.json();
};
*/
