import {useState, useEffect, useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {debounce} from 'lodash';
import axios from '../../../axios';
import {Toast} from 'native-base';

export const useCurrencyConversion = () => {
  const [sendAmount, setSendAmount] = useState<string>('0.1');
  const [sendCurrency, setSendCurrency] = useState('btc');
  const [receiveAmount, setReceiveAmount] = useState<string>();
  const [receiveCurrency, setReceiveCurrency] = useState('eth');

  const [debouncedSendAmount, setDebouncedSendAmount] = useState(sendAmount);

  const debouncedSetSendAmount = useCallback(
    debounce(setDebouncedSendAmount, 1000),
    [],
  );

  useEffect(() => {
    debouncedSetSendAmount(sendAmount);
    return () => debouncedSetSendAmount.cancel();
  }, [sendAmount, debouncedSetSendAmount]);

  const fetchEstimate = useCallback(
    async (currencyFrom: string, currencyTo: string, amount: string) => {
      const {data} = await axios.get('/get_estimated', {
        params: {
          fixed: false,
          currencyFrom,
          currencyTo,
          amount: +amount,
        },
      });
      return data;
    },
    [],
  );

  const estimateQuery = useQuery({
    queryKey: ['estimate', sendCurrency, receiveCurrency, debouncedSendAmount],
    queryFn: () =>
      fetchEstimate(sendCurrency, receiveCurrency, debouncedSendAmount),
    enabled: !!debouncedSendAmount,
    retry: false,
    staleTime: 0,
    refetchInterval: 5000,
    gcTime: 1,
  });

  const {
    data: estimatedData,
    isLoading: isEstimating,
    isError,
    error,
  } = estimateQuery;

  useEffect(() => {
    if (isError) {
      Toast.show({
        title: 'Error',
        description:
          (error as any).response?.data?.description || 'An error occurred.',
      });

      setReceiveAmount(undefined);
    }
  }, [error, isError]);

  const isDisabledExchange = useMemo(
    () => isEstimating || !debouncedSendAmount || !estimatedData || isError,
    [isError, isEstimating, estimatedData, debouncedSendAmount],
  );

  return {
    sendAmount,
    setSendAmount,
    receiveAmount,
    setReceiveAmount,
    sendCurrency,
    setSendCurrency,
    receiveCurrency,
    setReceiveCurrency,
    isDisabledExchange,
    estimatedData,
    isEstimating,
  };
};
