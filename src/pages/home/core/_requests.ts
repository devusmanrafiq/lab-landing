import axios from 'axios';

const TOKEN_PURCHASES = '/token-purchases';

export function tokenPurchases() {
  return axios.get(`${TOKEN_PURCHASES}`);
}
