import DetailsCards from './components/details-cards';
import Disclaimer from './components/disclaimer';
import LabInfo from './components/lab-info';
import PurchaseChart from './components/purchase-chart';
import PurchaseTable from './components/purchase-table';

function Home() {
  return (
    <section className='max-w-2xl mx-auto'>
      <LabInfo />
      <DetailsCards />
      <PurchaseChart />
      <PurchaseTable />
      <Disclaimer />
    </section>
  );
}

export default Home;
