import {Theme} from '@react-navigation/native';
import {FullTheme} from 'react-native-elements';
import {Colors} from './GlobalTheme';

export const GetNavTheme = (theme: Partial<FullTheme>): Theme => ({
  dark: false,
  colors: {
    text: theme.colors?.black ?? Colors.black,
    primary: theme.colors?.primary ?? Colors.primary,
    background: theme.colors?.primary ?? Colors.primary,
    border: theme.colors?.grey3 ?? Colors.grey,
    card: theme.colors?.grey1 ?? Colors.greyLightest,
    notification: theme.colors?.black ?? Colors.black,
  },
});
