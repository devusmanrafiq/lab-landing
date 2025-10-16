import { useMemo } from 'react';

import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

import Card from 'components/core-ui/card/card';

import { useTokenPurchaseData } from 'hooks/use-token-purchase-data';

import { formatCurrency, formatDate } from 'utils/currency';

function RevenueChart() {
  const { chartData, isLoading, error } = useTokenPurchaseData();

  const { dates, revenue, purchases, purchasePercentages } = useMemo(() => {
    if (!chartData) {
      return { dates: [], revenue: [], purchases: [], purchasePercentages: [] };
    }

    return {
      dates: chartData.dates,
      revenue: chartData.revenue,
      purchases: chartData.purchases,
      purchasePercentages: chartData.purchasePercentages,
    };
  }, [chartData]);

  // Check if mobile screen
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: 'transparent',
      title: {
        text: 'Revenue and purchases',
        top: 2,
        left: 'left',
        textStyle: {
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      //   toolbox: {
      //     show: true,
      //     right: '2%',
      //     top: '8%',
      //     feature: {
      //       dataZoom: {
      //         yAxisIndex: 'none',
      //         title: {
      //           zoom: 'Zoom',
      //           back: 'Reset',
      //         },
      //         iconStyle: {
      //           borderColor: '#00ff88',
      //         },
      //         emphasis: {
      //           iconStyle: {
      //             borderColor: '#ffffff',
      //           },
      //         },
      //       },
      //       restore: {
      //         title: 'Reset View',
      //         iconStyle: {
      //           borderColor: '#00ff88',
      //         },
      //         emphasis: {
      //           iconStyle: {
      //             borderColor: '#ffffff',
      //           },
      //         },
      //       },
      //     },
      //     iconStyle: {
      //       borderColor: '#888888',
      //     },
      //     tooltip: {
      //       backgroundColor: 'rgba(0, 0, 0, 0.8)',
      //       borderColor: '#00ff88',
      //       textStyle: {
      //         color: '#ffffff',
      //       },
      //     },
      //   },
      legend: {
        data: [
          {
            name: 'Revenue (SOL)',
            icon: 'circle',
            itemStyle: { color: '#00ff88' },
          },
          {
            name: "Purchases as a % of Prev Day's Revenue",
            icon: 'circle',
            itemStyle: { color: '#00ffdd' },
          },
          {
            name: 'Purchases (SOL)',
            icon: 'circle',
            itemStyle: { color: '#ff8800' },
          },
        ],
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
        top: isMobile ? 25 : 35,
        itemGap: isMobile ? 30 : 15,
        padding: [15, 0, 20, 0], // top, right, bottom, left padding
        orient: isMobile ? 'horizontal' : 'horizontal',
        left: 'center',
      },
      grid: {
        left: isMobile ? '8%' : '5%',
        right: isMobile ? '8%' : '5%',
        bottom: isMobile ? '25%' : '20%',
        top: isMobile ? '25%' : '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#444444',
          },
        },
        axisLabel: {
          color: '#888888',
          fontSize: isMobile ? 8 : 10,
          rotate: isMobile ? 60 : 45,
          interval: isMobile ? 2 : 0, // Show every 3rd label on mobile
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#2a2a2a',
            width: 1,
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Amount (SOL)',
          nameTextStyle: {
            color: '#888888',
          },
          axisLine: {
            lineStyle: {
              color: '#444444',
            },
          },
          axisLabel: {
            color: '#888888',
            formatter: (value: number) => {
              if (value >= 1000) {
                return `${(value / 1000).toFixed(0)}k`;
              }
              return value.toString();
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2a2a2a',
              width: 1,
            },
          },
        },
        {
          type: 'value',
          name: 'Percentage (%)',
          nameTextStyle: {
            color: '#888888',
          },
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#444444',
            },
          },
          axisLabel: {
            color: '#888888',
            formatter: '{value}%',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Revenue (SOL)',
          type: 'line',
          yAxisIndex: 0,
          data: revenue,
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#00ff88',
            width: 3,
            shadowColor: '#00ff88',
            shadowBlur: 10,
            shadowOffsetY: 0,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 136, 0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 255, 136, 0.1)',
                },
              ],
            },
          },
        },
        {
          name: "Purchases as a % of Prev Day's Revenue",
          type: 'line',
          yAxisIndex: 1,
          data: purchasePercentages,
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#00ffdd',
            width: 3,
            shadowColor: '#00ffdd',
            shadowBlur: 10,
            shadowOffsetY: 0,
          },
        },
        {
          name: 'Purchases (SOL)',
          type: 'line',
          yAxisIndex: 0,
          data: purchases,
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#ff8800',
            width: 3,
            shadowColor: '#ff8800',
            shadowBlur: 10,
            shadowOffsetY: 0,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 136, 0, 0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 136, 0, 0.1)',
                },
              ],
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#444444',
        textStyle: {
          color: '#ffffff',
        },
        formatter: (params: any) => {
          if (!params || params.length === 0) return '';

          const date = params[0].axisValue;
          const dataIndex = params[0].dataIndex;

          // Get values for this data point (these are real from API)
          const purchasesValue = purchases[dataIndex] || 0;

          // Convert date format for display
          const dateStr = formatDate.tooltip(date);

          return `
            <div style="
              padding: 16px; 
              min-width: 280px;
              font-family: 'Inter', sans-serif;
              line-height: 1.4;
            ">
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #ffffff;">
                ${date}
              </div>
              
              <div style="margin-bottom: 12px;">
                <span style="color: #ff8800; font-size: 14px;">●</span>
                <span style="color: #ffffff; margin-left: 8px;">Daily Purchases: ${formatCurrency.sol(purchasesValue)}</span>
              </div>
              
              <hr style="border: none; border-top: 1px solid #444; margin: 12px 0;">
              
              <div style="color: #888888; font-size: 13px;">
                <div style="margin-bottom: 4px;">
                  <strong>Date:</strong> ${dateStr}
                </div>
                <div>
                  <strong>Total SOL Purchased:</strong> ${formatCurrency.sol(purchasesValue)}
                </div>
              </div>
              
              <div style="margin-top: 8px; color: #666; font-size: 11px; font-style: italic;">
                * Revenue and percentage data are estimated calculations
              </div>
            </div>
          `;
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
          filterMode: 'none',
        },
        {
          type: 'slider',
          show: !isMobile, // Hide slider on mobile to save space
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 20,
          height: 20,
          backgroundColor: 'rgba(47, 69, 84, 0.3)',
          dataBackground: {
            lineStyle: {
              color: '#00ff88',
              width: 1,
            },
            areaStyle: {
              color: 'rgba(0, 255, 136, 0.2)',
            },
          },
          selectedDataBackground: {
            lineStyle: {
              color: '#00ff88',
            },
            areaStyle: {
              color: 'rgba(0, 255, 136, 0.3)',
            },
          },
          handleStyle: {
            color: '#00ff88',
            borderColor: '#00ff88',
          },
          textStyle: {
            color: '#888888',
          },
        },
      ],
      animationDuration: 1000,
      animationEasing: 'cubicOut',
    }),
    [dates, revenue, purchases, purchasePercentages, isMobile]
  );

  if (isLoading) {
    return (
      <Card className='mt-14 p-4 sm:p-6'>
        <div className={`w-full ${isMobile ? 'h-[400px]' : 'h-[500px]'} flex items-center justify-center`}>
          <div className='text-white text-lg sm:text-xl'>Loading revenue data...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='mt-14 p-4 sm:p-6'>
        <div className={`w-full ${isMobile ? 'h-[400px]' : 'h-[500px]'} flex items-center justify-center`}>
          <div className='text-red-400 text-lg sm:text-xl'>Failed to load revenue data</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className='mt-14 p-4 sm:p-6'>
      <div className={`w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} theme='dark' />
      </div>
      <div className='mt-4 text-sm text-secondary leading-relaxed'>
        <p>
          Lab.pro currently expects to use substantially all net revenue for strategic investments. Lab.pro may modify
          or discontinue those plans at any time. The $LAB token does not represent a right to revenues or any other
          distribution.
        </p>
      </div>
    </Card>
  );
}

export default RevenueChart;
