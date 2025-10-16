import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import rqConfigs from 'configs/rq-configs';

import Router from 'routes/router';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
const queryClient = new QueryClient(rqConfigs);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Inter',
          },
          components: {},
        }}
      >
        <Router />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}

export default App;
