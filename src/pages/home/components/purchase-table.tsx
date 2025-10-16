import Card from 'components/core-ui/card/card';

import { useTokenPurchaseData } from 'hooks/use-token-purchase-data';

function PurchaseTable() {
  const { tableData, isLoading, error } = useTokenPurchaseData();

  if (isLoading) {
    return (
      <section className='mt-10'>
        <Card className='p-8'>
          <h2 className='text-xl font-semibold text-white mb-6'>Token Purchases</h2>
          <div className='animate-pulse space-y-3'>
            <div className='h-4 bg-gray-700 rounded w-full'></div>
            <div className='h-4 bg-gray-700 rounded w-full'></div>
            <div className='h-4 bg-gray-700 rounded w-full'></div>
            <div className='h-4 bg-gray-700 rounded w-3/4'></div>
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
          <div className='min-w-[1200px]'>
            {/* Table Header */}
            <div className='grid grid-cols-6 text-secondary gap-4 px-6 py-4 border-t  border-t-[#323232] border-b border-b-[#969696]'>
              <div className='text-sm font-medium'>Amount (LAB)</div>
              <div className='text-sm font-medium'>Amount (SOL)</div>
              <div className='text-sm font-medium'>Amount (USD)</div>
              <div className='text-sm font-medium'>Price</div>
              {/* <div className='text-sm font-medium'>% of Daily Revenue</div> */}
              <div className='text-sm font-medium'>Revenue</div>
              <div className='text-sm font-medium'>Time</div>
            </div>

            {/* Table Body */}
            <div className='divide-y divide-[#323232]'>
              {tableData?.map((purchase) => (
                <div
                  key={purchase.id}
                  className={`grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-800/30 hover:cursor-pointer transition-colors duration-150`}
                >
                  {/* Amount (LAB) */}
                  <div className='text-white font-medium'>{purchase.amountPump}</div>

                  {/* Amount (SOL) */}
                  <div className='text-white'>{purchase.amountSol}</div>

                  {/* Amount (USD) */}
                  <div className='text-white'>{purchase.amountUsd}</div>

                  {/* Price */}
                  <div className='text-green font-medium'>{purchase.price}</div>

                  {/* % of Daily Revenue */}
                  {/* <div className='text-white'>{purchase.dailyRevenuePercent}</div> */}

                  {/* Revenue */}
                  <div className='text-white'>{purchase.revenue}</div>

                  {/* Time */}
                  <div className='text-gray-400'>{purchase.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Optional: Load more button or pagination can go here */}
        <div className='p-6 pt-4 border-t border-gray-700/50'>
          <p className='text-sm text-gray-500 text-center'>
            Showing {tableData?.length || 0} latest purchases from your API
          </p>
        </div>
      </Card>
    </section>
  );
}

export default PurchaseTable;
