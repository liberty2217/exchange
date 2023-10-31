import {Box, Text, Heading} from 'native-base';
import React from 'react';
import {Screen} from '../../navigation/types/screen';
import {Routes} from '../../navigation/routes';

export type ExchangeSuccessParams = {
  status: string;
  address_from: string;
  address_to: string;
  amount_from: string;
  amount_to: string;
  currency_from: string;
  currency_to: string;
};

export const ExchangeSuccess: Screen<Routes.ExchangeSuccess> = ({route}) => {
  const {
    status,
    address_from,
    address_to,
    amount_from,
    amount_to,
    currency_from,
    currency_to,
  } = route?.params;

  return (
    <Box flex={1} justifyContent="center" p={4}>
      <Heading size="lg" mb={2}>
        Confirm Exchange
      </Heading>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">Status:</Text> {status}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">From Address:</Text> {address_from}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">To Address:</Text> {address_to}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">Amount From:</Text> {amount_from}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">Amount To:</Text> {amount_to}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">Currency From:</Text> {currency_from}
      </Text>
      <Text fontSize="md" mb={2}>
        <Text fontWeight="bold">Currency To:</Text> {currency_to}
      </Text>
    </Box>
  );
};

ExchangeSuccess.options = () => ({
  title: 'Confirm Exchange',
});
