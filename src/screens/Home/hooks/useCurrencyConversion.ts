import {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {debounce} from 'lodash';
import axios from '../../../axios';
import {Toast} from 'native-base';

export const useCurrencyConversion = () => {
  const [sendAmount, setSendAmount] = useState<string>('0.1');
  const [sendCurrency, setSendCurrency] = useState('btc');

  const [debouncedSendAmount, setDebouncedSendAmount] = useState(sendAmount);
  const debouncer = useRef(
    debounce(newAmount => setDebouncedSendAmount(newAmount), 500),
  );

  const [receiveAmount, setReceiveAmount] = useState<string>();
  const [receiveCurrency, setReceiveCurrency] = useState('eth');

  useEffect(() => {
    debouncer.current(sendAmount);
  }, [sendAmount]);

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
      setSendAmount('');
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
