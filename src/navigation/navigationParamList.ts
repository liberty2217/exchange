import {ParamListBase} from '@react-navigation/native';
import {Routes} from './routes';
import {ConfirmExchangeParams} from '../screens/ConfirmExchange';
import {ExchangeSuccessParams} from '../screens/ExchangeSuccess';

export interface NavigationParamList extends ParamListBase {
  [Routes.ConfirmExchange]: ConfirmExchangeParams;
  [Routes.ExchangeSuccess]: ExchangeSuccessParams;
}
