import {ParamListBase} from '@react-navigation/native';
import {Routes} from './routes';

export interface NavigationParamList extends ParamListBase {
  [Routes.Home]: {};
}
