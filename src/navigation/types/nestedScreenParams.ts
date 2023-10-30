import {Routes} from '../routes';

export type NestedScreenParams<RouteName extends Routes, P = undefined> =
  | undefined
  | {screen: RouteName | null; params?: P};
