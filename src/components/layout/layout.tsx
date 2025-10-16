import { Outlet } from 'react-router-dom';

import ScrollToTop from 'helpers/scroll-to-top';

import WithSuspense from 'routes/with-suspense';

function Layout() {
  return (
    <div className='max-w-4xl mx-auto p-10'>
      <ScrollToTop />

      <WithSuspense>
        <Outlet />
      </WithSuspense>
    </div>
  );
}

export default Layout;
