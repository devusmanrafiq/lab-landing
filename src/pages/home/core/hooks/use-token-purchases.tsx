import { useQuery } from '@tanstack/react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { tokenPurchases } from '../_requests';

const useTokenPurchase = () => {
  const { data, isPending } = useQuery({
    queryKey: [QUERIES_KEYS.TOKEN_PURCHASES],
    queryFn: () => tokenPurchases(),
  });

  return {
    tokenPurchaseData: data?.data,
    isPendingTokenPurchaseData: isPending,
  };
};

export default useTokenPurchase;
