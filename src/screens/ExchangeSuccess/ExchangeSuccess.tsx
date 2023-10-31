import {Box, Text, Heading} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Screen} from '../../navigation/types/screen';
import {Routes} from '../../navigation/routes';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';

export type ExchangeSuccessParams = {
  status: string;
  address_from: string;
  address_to: string;
  amount_from: string;
  amount_to: string;
  currency_from: string;
  currency_to: string;
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
});

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

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }, []);

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={4}>
      {showAnimation ? (
        <LottieView
          source={require('../../../assets/animations/money.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={() => setShowAnimation(false)}
        />
      ) : (
        <Box>
          <Heading size="lg" mb={2}>
            Successfully Sent!
          </Heading>
          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Status:</Text> {status}
          </Text>

          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Receiver Address:</Text> {address_to}
          </Text>

          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Recepient Address:</Text> {address_from}
          </Text>

          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Amount You Send:</Text> {amount_from}
          </Text>
          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Amount To Receive:</Text> {amount_to}
          </Text>
          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Currency You Send:</Text> {currency_from}
          </Text>
          <Text fontSize="md" mb={2}>
            <Text fontWeight="bold">Currency To Receive:</Text> {currency_to}
          </Text>
        </Box>
      )}
    </Box>
  );
};

ExchangeSuccess.options = () => ({
  title: 'Success',
});
