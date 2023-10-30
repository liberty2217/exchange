import React from 'react';

import {Routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home/Home';
import {defaultScreenOptions} from './types/options';

const AppStack = createNativeStackNavigator();

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
    </AppStack.Navigator>
  );
};
