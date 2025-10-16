import LabLogo from 'assets/icons/lab-logo.svg?react';

function LabInfo() {
  return (
    <section className='pt-[8vh]'>
      <LabLogo className='mx-auto' />
      <p className='text-secondary text-center text-xl'>
        View historical lab.pro revenue and $LAB purchases since token launch
      </p>
    </section>
  );
}

export default LabInfo;
