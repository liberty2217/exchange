import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {Screen} from '../../navigation/types/screen';
import {Routes} from '../../navigation/routes';
import {TransferInput} from '../../components/TransferInput';
import useCreateExchange from './hooks/useCreateExchange';

export type ConfirmExchangeParams = {
  sendAmount: string;
  sendCurrency: string;
  receiveAmount: string;
  receiveCurrency: string;
  sendAddressValidation: string;
  refundAddressValidation: string;
};

export const ConfrimExchange: Screen<Routes.ConfirmExchange> = ({
  route,
  navigation,
}) => {
  const {
    sendAmount,
    sendCurrency,
    receiveAmount,
    receiveCurrency,
    sendAddressValidation,
    refundAddressValidation,
  } = route?.params;

  const {addressInput, refundAddressInput, handleExchange} = useCreateExchange({
    sendAddressValidation,
    refundAddressValidation,
    sendCurrency,
    receiveCurrency,
    sendAmount,
    navigation,
  });

  return (
    <Box className="flex-1 justify-center mx-4">
      <FormControl
        isInvalid={!addressInput.isValid && addressInput.isTouched}
        w="100%"
        className="mb-5">
        <Input
          placeholder="Specify address to send"
          value={addressInput.value}
          onChangeText={addressInput.onChange}
          onBlur={addressInput.onBlur}
        />
        {!addressInput.isValid && addressInput.isTouched && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Address is not valid
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl
        isInvalid={!refundAddressInput.isValid && refundAddressInput.isTouched}
        w="100%"
        className="mb-5">
        <Input
          placeholder="Specify your refund address"
          value={refundAddressInput.value}
          onChangeText={refundAddressInput.onChange}
          onBlur={refundAddressInput.onBlur}
        />
        {!refundAddressInput.isValid && refundAddressInput.isTouched && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Refund address is not valid
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <TransferInput
        service={sendCurrency}
        containerClassName={'mb-4'}
        inputPlaceholder="You send"
        amount={sendAmount}
        isDisabled={true}
      />
      <TransferInput
        service={receiveCurrency}
        inputPlaceholder="You receive"
        containerClassName={'mb-4'}
        amount={receiveAmount}
        isDisabled={true}
      />

      <Button onPress={handleExchange} borderRadius={0} colorScheme={'blue'}>
        <Text className="text-xs color-white">Confirm</Text>
      </Button>
    </Box>
  );
};

ConfrimExchange.options = () => ({
  title: 'Confirm Exchange',
});
