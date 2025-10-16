import Card from 'components/core-ui/card/card';

import CLockIcon from 'assets/icons/clock-icon.svg?react';
import WaveIcon from 'assets/icons/wave-icon.svg?react';

import { useTokenPurchaseData } from '../core/hooks/use-token-purchase-data';

function DetailsCards() {
  const { totalStats, isLoading } = useTokenPurchaseData();

  // Format large numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num: number): string => {
    return `$${formatNumber(num)}`;
  };

  if (isLoading) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 mt-20'>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <div className='animate-pulse'>
              <div className='h-4 bg-secondary rounded mb-2'></div>
              <div className='h-8 bg-secondary rounded'></div>
            </div>
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20'>
      <Card>
        <div className='flex items-center gap-2'>
          <WaveIcon />
          <p className='text-sm text-secondary'>Total LAB Purchases</p>
        </div>
        <h3 className='text-3xl pt-2 text-green'>{totalStats ? formatNumber(totalStats.totalBaseAmount) : '0'} LAB</h3>
      </Card>

      <Card>
        <div className='flex items-center gap-2'>
          <WaveIcon />
          <p className='text-sm text-secondary'>Total LAB Purchases (USD)</p>
        </div>
        <h3 className='text-3xl pt-2'>{totalStats ? formatCurrency(totalStats.totalQuoteAmountUsd) : '$0'}</h3>
      </Card>

      <Card>
        <div className='flex items-center gap-2'>
          <CLockIcon />
          <p className='text-sm text-secondary'>Total supply</p>
        </div>
        <h3 className='text-3xl pt-2'>1B LAB</h3>
      </Card>

      <Card>
        <div className='flex items-center gap-2'>
          <CLockIcon />
          <p className='text-sm text-secondary'>Total circulating supply offset</p>
        </div>
        <h3 className='text-3xl pt-2'>{totalStats ? `${totalStats.totalCirculatingSupply}%` : '0%'}</h3>
      </Card>
    </section>
  );
}

export default DetailsCards;
