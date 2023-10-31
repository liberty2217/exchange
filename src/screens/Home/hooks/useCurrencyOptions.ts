import {useQuery} from '@tanstack/react-query';
import axios from '../../../axios';
import {useCallback} from 'react';

export const useCurrencyOptions = () => {
  const fetchCurrencies = useCallback(async () => {
    const {data} = await axios.get('/get_all_currencies');
    return data;
  }, []);

  const {data} = useQuery({queryKey: ['todos'], queryFn: fetchCurrencies});

  return {
    currencies: data,
  };
};
