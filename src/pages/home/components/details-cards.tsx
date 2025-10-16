import Card from 'components/core-ui/card/card';

import WaveIcon from 'assets/icons/wave-icon.svg?react';

function DetailsCards() {
  return (
    <section className='grid grid-cols-4 gap-x-8 mt-20 max-w-2xl mx-auto'>
      <Card>
        <div className='flex items-center gap-2'>
          <WaveIcon />
          <p className='text-sm text-secondary'>Total $PUMP Purchases</p>
        </div>
        <h3 className='text-3xl pt-2'>704265 SOL</h3>
      </Card>
    </section>
  );
}

export default DetailsCards;
