import React, {useCallback} from 'react';

import {Box, Button, Text} from 'native-base';
import {TransferInput} from '../../components/TransferInput';
import {useCurrencyOptions} from './hooks/useCurrencyOptions';
import {useCurrencyConversion} from './hooks/useCurrencyConversion';
import {Routes} from '../../navigation/routes';
import {Screen} from '../../navigation/types/screen';

export const Home: Screen<Routes.Home> = ({navigation}) => {
  const {
    sendAmount,
    sendCurrency,
    receiveCurrency,
    isDisabledExchange,
    estimatedData,
    isEstimating,
    setSendAmount,
    setReceiveAmount,
    setSendCurrency,
    setReceiveCurrency,
  } = useCurrencyConversion();

  const {
    currencies,
    currentSendAddressValidation,
    currentRefundAddressValidation,
  } = useCurrencyOptions(sendCurrency, receiveCurrency);

  const navigateToConfirmExchange = useCallback(() => {
    navigation.navigate(Routes.ConfirmExchange, {
      sendAmount,
      sendCurrency,
      receiveCurrency,
      receiveAmount: estimatedData,
      sendAddressValidation: currentSendAddressValidation,
      refundAddressValidation: currentRefundAddressValidation,
    });
  }, [
    currentRefundAddressValidation,
    currentSendAddressValidation,
    estimatedData,
    navigation,
    receiveCurrency,
    sendAmount,
    sendCurrency,
  ]);

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
        onPress={navigateToConfirmExchange}
        isLoading={isEstimating}
        isDisabled={isDisabledExchange}
        borderRadius={0}
        colorScheme={'blue'}>
        <Text className="text-xs color-white">Exchange</Text>
      </Button>
    </Box>
  );
};

Home.options = () => ({
  headerShown: false,
});
