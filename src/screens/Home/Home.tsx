import React from 'react';

import {Box, Button} from 'native-base';
import {TransferInput} from '../../components/TransferInput';
import {useCurrencyOptions} from './hooks/useCurrencyOptions';
import {useCurrencyConversion} from './hooks/useCurrencyConversion';

export const Home = () => {
  const {
    sendAmount,
    setSendAmount,
    setReceiveAmount,
    sendCurrency,
    setSendCurrency,
    receiveCurrency,
    setReceiveCurrency,
    isDisabledExchange,
    estimatedData,
    isEstimating,
  } = useCurrencyConversion();

  const {currencies} = useCurrencyOptions();

  return (
    <Box className="flex-1 justify-center mx-4">
      <TransferInput
        service={sendCurrency}
        setService={setSendCurrency}
        containerClassName={'mb-4'}
        inputPlaceholder="You send"
        amount={sendAmount}
        onChangeAmount={setSendAmount}
        options={currencies}
        isDisabled={isEstimating}
      />
      <TransferInput
        service={receiveCurrency}
        setService={setReceiveCurrency}
        inputPlaceholder="You receive"
        containerClassName={'mb-4'}
        amount={estimatedData}
        onChangeAmount={setReceiveAmount}
        options={currencies}
        isDisabled={isEstimating}
      />
      <Button
        isLoading={isEstimating}
        isDisabled={isDisabledExchange}
        borderRadius={0}
        colorScheme={'blue'}
        _text={{fontSize: 12}}>
        Exchange
      </Button>
    </Box>
  );
};

Home.options = () => ({
  headerShown: false,
});
