import LabLogo from 'assets/icons/lab-logo.svg?react';

function LabInfo() {
  return (
    <section className='pt-5 md:pt-[8vh]'>
      <LabLogo className='mx-auto' />
      <p className='text-secondary text-center text-xl'>View historical LAB purchases since token launch</p>
    </section>
  );
}

export default LabInfo;
