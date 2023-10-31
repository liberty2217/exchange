import {useQuery} from '@tanstack/react-query';
import axios from '../../../axios';
import {useCallback} from 'react';

export const useCurrencyOptions = (
  sendCurrency: string,
  receiveCurrency: string,
) => {
  const fetchCurrencies = useCallback(async () => {
    const {data} = await axios.get('/get_all_currencies');
    return data;
  }, []);

  const {data} = useQuery({queryKey: ['todos'], queryFn: fetchCurrencies});

  const currentSendAddressValidation = data?.find(
    currency => currency.symbol === receiveCurrency,
  )?.validation_address;

  const currentRefundAddressValidation = data?.find(
    currency => currency.symbol === sendCurrency,
  )?.validation_address;

  return {
    currencies: data,
    currentSendAddressValidation,
    currentRefundAddressValidation,
  };
};
