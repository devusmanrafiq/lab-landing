import DetailsCards from './components/details-cards';
import Disclaimer from './components/disclaimer';
import LabInfo from './components/lab-info';
import PurchaseTable from './components/purchase-table';
import RevenueChart from './components/revenue-chart';

function Home() {
  return (
    <section className='max-w-2xl mx-auto'>
      <LabInfo />
      <DetailsCards />
      <RevenueChart />
      <PurchaseTable />
      <Disclaimer />
    </section>
  );
}

export default Home;
