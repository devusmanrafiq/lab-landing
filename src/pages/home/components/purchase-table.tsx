import Card from 'components/core-ui/card/card';

import BnbIcon from 'assets/icons/bnb-icon.svg?react';
import LabIcon from 'assets/icons/lab-icon.svg?react';

import { useTokenPurchaseData } from '../core/hooks/use-token-purchase-data';

function PurchaseTable() {
  const { tableData, isLoading, error } = useTokenPurchaseData();

  if (isLoading) {
    return (
      <section className='mt-10'>
        <Card className='p-8'>
          <h2 className='text-xl font-semibold text-white mb-6'>Token Purchases</h2>
          <div className='animate-pulse space-y-3'>
            <div className='h-4 bg-secondary rounded w-full'></div>
            <div className='h-4 bg-secondary rounded w-3/4'></div>
            <div className='h-4 bg-secondary rounded w-full'></div>
            <div className='h-4 bg-secondary rounded w-3/4'></div>
            <div className='h-4 bg-secondary rounded w-full'></div>
          </div>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className='mt-10'>
        <Card className='p-8'>
          <h2 className='text-xl font-semibold text-white mb-6'>Token Purchases</h2>
          <div className='text-red-400 bg-red-900/20 p-4 rounded-lg'>
            <p className='font-medium'>Error loading purchase data</p>
            <p className='text-sm mt-1'>{error.message}</p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className='mt-10'>
      <Card className='p-0 overflow-hidden'>
        {/* Table Header */}
        <div className='p-8 pb-0'>
          <h2 className='text-xl font-semibold text-white mb-6'>Token Purchases</h2>
        </div>

        {/* Table Container with responsive scroll */}
        <div className='xl:overflow-visible overflow-x-auto'>
          <div className='min-w-[800px]'>
            {/* Table Header */}
            <div className='grid grid-cols-5 text-secondary gap-4 px-6 py-4 border-t  border-t-[#323232] border-b border-b-[#969696]'>
              <div className='text-base font-medium'>Amount (LAB)</div>
              <div className='text-base font-medium'>Amount (BNB)</div>
              <div className='text-base font-medium'>Amount (USD)</div>
              <div className='text-base font-medium'>Price</div>
              {/* <div className='text-base font-medium'>% of Daily Revenue</div> */}
              {/* <div className='text-base font-medium'>Revenue</div> */}
              <div className='text-base font-medium'>Time</div>
            </div>

            {/* Table Body */}
            <div className='divide-y divide-[#323232]'>
              {tableData?.map((purchase) => (
                <div
                  key={purchase.id}
                  className={`grid grid-cols-5 text-sm gap-4 px-6 py-4 hover:bg-gray-800/30 hover:cursor-pointer transition-colors duration-150`}
                >
                  {/* Amount (LAB) */}
                  <div className='text-white font-medium flex items-center gap-1'>
                    <LabIcon /> {purchase.amountPump}
                  </div>

                  {/* Amount (BNB) */}
                  <div className='text-white font-medium flex items-center gap-1'>
                    <BnbIcon /> {purchase.amountSol}
                  </div>

                  {/* Amount (USD) */}
                  <div className='text-white'>{purchase.amountUsd}</div>

                  {/* Price */}
                  <div className='text-green font-medium'>{purchase.price}</div>

                  {/* % of Daily Revenue */}
                  {/* <div className='text-white'>{purchase.dailyRevenuePercent}</div> */}

                  {/* Revenue */}
                  {/* <div className='text-white'>{purchase.revenue}</div> */}

                  {/* Time */}
                  <div className='text-gray-400'>{purchase.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default PurchaseTable;
