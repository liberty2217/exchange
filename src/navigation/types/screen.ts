import React from 'react';

import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  NavigationProp as NavigationPropBase,
  RouteProp,
} from '@react-navigation/native';

import {Routes} from '../routes';
import {NavigationParamList} from '../navigationParamList';

type ScreenComponentType<
  ParamList extends NavigationParamList,
  RouteName extends Routes,
> = React.FunctionComponent<{
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}>;

export type Screen<RouteName extends Routes> = ScreenComponentType<
  NavigationParamList,
  RouteName
> & {
  options?: () => NativeStackNavigationOptions;
};

export type NavigationPropType = NavigationPropBase<NavigationParamList> & {
  state: any;
};
