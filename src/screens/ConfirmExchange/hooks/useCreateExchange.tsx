import {useCallback} from 'react';
import {Routes} from '../../../navigation/routes';
import {Toast} from 'native-base';
import axios from '../../../axios';
import useFormInput from '../../../hooks/useFormInput';
import {NavigationPropType} from '../../../navigation/types/screen';

type UseCreateExchangeProps = {
  sendAddressValidation: string;
  refundAddressValidation: string;
  sendCurrency: string;
  receiveCurrency: string;
  sendAmount: string;
  navigation: NavigationPropType;
};

const useCreateExchange = ({
  sendAddressValidation,
  refundAddressValidation,
  sendCurrency,
  receiveCurrency,
  sendAmount,
  navigation,
}: UseCreateExchangeProps) => {
  const addressInput = useFormInput('', new RegExp(sendAddressValidation));
  const refundAddressInput = useFormInput(
    '',
    new RegExp(refundAddressValidation),
  );

  const createExchange = useCallback(async () => {
    try {
      const response = await axios.post('/create_exchange', {
        fixed: true,
        currency_from: sendCurrency,
        currency_to: receiveCurrency,
        amount: sendAmount,
        address_to: addressInput.value,
        extra_id_to: '',
        user_refund_address: refundAddressInput.value,
      });
      return {success: true, data: response.data};
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: error.response?.data?.description || 'An error occurred.',
      };
    }
  }, [
    addressInput.value,
    refundAddressInput.value,
    sendCurrency,
    receiveCurrency,
    sendAmount,
  ]);

  const handleExchange = useCallback(async () => {
    addressInput.onBlur();
    refundAddressInput.onBlur();

    if (addressInput.isValid && refundAddressInput.isValid) {
      const result = await createExchange();
      if (result.success) {
        navigation.navigate(Routes.ExchangeSuccess, {
          status: result.data.status,
          address_from: result.data.address_from,
          address_to: result.data.address_to,
          amount_from: result.data.amount_from,
          amount_to: result.data.amount_to,
          currency_from: result.data.currency_from,
          currency_to: result.data.currency_to,
        });
      } else {
        Toast.show({
          title: 'Error',
          description: result.message,
        });
      }
    } else {
      Toast.show({
        title: 'Invalid Input',
        description: 'Please ensure all fields are correctly filled out.',
      });
    }
  }, [addressInput, refundAddressInput, createExchange, navigation]);

  return {
    addressInput,
    refundAddressInput,
    handleExchange,
  };
};

export default useCreateExchange;
