/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContactInfo, OrderType } from './types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Main: undefined;
  AddContact: undefined | {onGoBack: (value : ContactInfo | undefined) => void};
  Checkout: undefined | {onGoBack: (value: OrderType | undefined) => void, irisClass : string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootDrawerParamList = {
  Shop: undefined;
  Contacts: undefined;
};

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> = NativeStackScreenProps<
  RootDrawerParamList,
  Screen
>;