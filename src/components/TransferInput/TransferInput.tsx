import {
  Actionsheet,
  Box,
  FlatList,
  Input,
  Pressable,
  Text,
  useDisclose,
} from 'native-base';
import React, {FC, useCallback} from 'react';

type TransferInputProps = {
  service: string;
  setService: (service: string) => void;
  containerClassName?: string;
  inputPlaceholder: string;
  amount?: string;
  onChangeAmount: (amount: string) => void;
  options: any[];
  isDisabled?: boolean;
};

export const TransferInput: FC<TransferInputProps> = ({
  service,
  setService,
  containerClassName,
  inputPlaceholder,
  amount,
  options,
  onChangeAmount,
  isDisabled,
}) => {
  const onChangeValue = useCallback(
    (value: string) => onChangeAmount(value),
    [onChangeAmount],
  );

  const {isOpen, onOpen, onClose} = useDisclose();

  const renderOption = useCallback(
    ({item}) => (
      <Actionsheet.Item
        onPress={() => {
          console.log('renderOption item', item);
          setService(item.symbol);
          onClose();
        }}>
        {item.name}
      </Actionsheet.Item>
    ),
    [onClose, setService],
  );

  return (
    <Box flexDirection={'row'} className={containerClassName}>
      <Input
        flex={1}
        marginRight={0.5}
        keyboardType="numeric"
        variant={'unstyled'}
        borderRadius={0}
        placeholder={inputPlaceholder}
        placeholderTextColor={'#4c5368'}
        backgroundColor={'#e3eaf5'}
        fontSize={10}
        value={amount}
        onChangeText={onChangeValue}
        isDisabled={isDisabled}
      />

      <Pressable
        width={100}
        borderRadius={0}
        backgroundColor={'#d6e1eb'}
        justifyContent={'center'}
        onPress={onOpen}>
        <Text fontSize={10} marginLeft={2}>
          {service.toUpperCase()}
        </Text>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <FlatList
            initialNumToRender={10}
            updateCellsBatchingPeriod={1000}
            maxToRenderPerBatch={5}
            className="w-full"
            data={options}
            keyExtractor={item => `${item.name} ${item.symbol}`}
            renderItem={renderOption}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
