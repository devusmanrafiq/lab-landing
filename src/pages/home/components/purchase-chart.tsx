import { useMemo } from 'react';

import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

import Card from 'components/core-ui/card/card';

import { useTokenPurchaseData } from '../core/hooks/use-token-purchase-data';

function PurchaseChart() {
  const { chartData, isLoading, error } = useTokenPurchaseData();

  const { dates, purchases } = useMemo(() => {
    if (!chartData) {
      return { dates: [], purchases: [] };
    }

    return {
      dates: chartData.dates,
      purchases: chartData.purchases,
    };
  }, [chartData]);

  // Check if mobile screen
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: 'transparent',
      title: {
        text: 'Token Purchases',
        top: 2,
        left: 'left',
        textStyle: {
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      legend: {
        show: false, // Hide legend since we only have one line
      },
      grid: {
        left: isMobile ? '8%' : '5%',
        right: isMobile ? '8%' : '5%',
        bottom: isMobile ? '10%' : '20%',
        top: isMobile ? '20%' : '15%', // Reduced top since no legend
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#444444',
            type: 'solid',
            width: 1,
          },
        },

        splitLine: {
          show: false, // Hide vertical grid lines
          lineStyle: {
            color: '#2a2a2a',
            width: 1,
            type: 'solid',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Amount (LAB)',
          nameTextStyle: {
            color: '#888888',
          },
          axisLine: {
            lineStyle: {
              color: '#444444',
              type: 'solid', // Dotted line for y-axis
              width: 1,
            },
          },

          splitLine: {
            show: true, // Show horizontal grid lines
            lineStyle: {
              color: '#2a2a2a',
              width: 1,
              type: 'solid', // Dotted horizontal grid lines
            },
          },
        },
      ],
      series: [
        {
          name: 'Purchases (LAB)',
          type: 'line',
          yAxisIndex: 0,
          data: purchases,
          smooth: true,
          symbol: 'circle',
          symbolSize: 0, // Hide symbols by default
          lineStyle: {
            color: '#a0ff06',
            width: 3,
            shadowColor: '#a0ff06',
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
                  color: 'rgba(0, 0, 0, 0)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 0, 0, 0)',
                },
              ],
            },
          },
          emphasis: {
            scale: false, // Disable scaling on hover
            lineStyle: {
              width: 3,
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#a0ff06',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
        },
        axisPointer: {
          type: 'cross', // Show both horizontal and vertical cursor lines
          lineStyle: {
            color: '#969696',
            width: 1,
            type: 'dashed',
          },
          crossStyle: {
            color: '#969696',
            width: 1,
            type: 'dashed',
          },
        },
        formatter: (params: any) => {
          if (!params || params.length === 0) return '';

          const date = params[0].axisValue;
          const dataIndex = params[0].dataIndex;
          const purchasesValue = purchases[dataIndex] || 0;

          return `
            <div style="
              padding: 12px; 
              min-width: 200px;
              font-family: 'Inter', sans-serif;
              line-height: 1.4;
            ">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #ffffff;">
                ${date}
              </div>
              
              <div style="margin-bottom: 8px;">
                <span style="color: #a0ff06; font-size: 14px;">●</span>
                <span style="color: #ffffff; margin-left: 8px;">Purchases: ${purchasesValue.toFixed(2)} LAB</span>
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
              color: '#a0ff06',
              width: 1,
            },
            areaStyle: {
              color: 'rgba(0, 255, 136, 0.2)',
            },
          },
          selectedDataBackground: {
            lineStyle: {
              color: '#a0ff06',
            },
            areaStyle: {
              color: 'rgba(0, 255, 136, 0.3)',
            },
          },
          handleStyle: {
            color: '#a0ff06',
            borderColor: '#a0ff06',
          },
          textStyle: {
            color: '#888888',
          },
        },
      ],
      animationDuration: 1000,
      animationEasing: 'cubicOut',
    }),
    [dates, purchases, isMobile]
  );

  if (isLoading) {
    return (
      <Card className='mt-14 p-4 sm:p-6'>
        <div className='animate-pulse space-y-3'>
          <div className='h-4 bg-secondary rounded w-full'></div>
          <div className='h-4 bg-secondary rounded w-3/4'></div>
          <div className='h-4 bg-secondary rounded w-full'></div>
          <div className='h-4 bg-secondary rounded w-3/4'></div>
          <div className='h-4 bg-secondary rounded w-full'></div>
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
          or discontinue those plans at any time. The LAB token does not represent a right to revenues or any other
          distribution.
        </p>
      </div>
    </Card>
  );
}

export default PurchaseChart;
