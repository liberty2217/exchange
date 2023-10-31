import React from 'react';

import {Routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {defaultScreenOptions} from './types/options';
import {ConfrimExchange} from '../screens/ConfirmExchange';
import {ExchangeSuccess} from '../screens/ExchangeSuccess';
import {NavigationParamList} from './navigationParamList';

const AppStack = createNativeStackNavigator<NavigationParamList>();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={defaultScreenOptions}>
      <AppStack.Screen
        name={Routes.Home}
        component={Home}
        options={Home.options?.()}
      />
      <AppStack.Screen
        name={Routes.ConfirmExchange}
        component={ConfrimExchange}
        options={ConfrimExchange.options?.()}
      />
      <AppStack.Screen
        name={Routes.ExchangeSuccess}
        component={ExchangeSuccess}
        options={ExchangeSuccess.options?.()}
      />
    </AppStack.Navigator>
  );
};
