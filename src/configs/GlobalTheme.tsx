import {Theme} from 'react-native-elements';

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module 'react-native-elements' {
  export interface Colors {
    background: string;
    text: string;
    danger: string;
  }
}

export const Colors = {
  primary: '#BBB330',
  secondary: '#E3E3FF',
  primaryDark: '#626000',
  secondaryDark: '#233233',
  white: '#FFF',
  black: '#000',
  grey: '#888',
  greyLighter: '#CCC',
  greyLightest: '#EEE',
  greyDarker: '#555',
  greyDarkest: '#222',
  red: '#C32020',
};

// 与黑暗模式无关的主题
const DarkOutTheme: Theme = {
  Button: {
    type: 'solid',
    buttonStyle: {
      backgroundColor: 'transparent',
    },
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.white,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 100,
    },
  },
  Header: {
    centerComponent: {
      style: {
        fontSize: 17,
        fontWeight: 'bold',
      }
    }
  },
  Text: {
    style: {
      fontSize: 15,
    }
  },
};

export const GlobalTheme: { dark: Theme, light: Theme } = {
  light: {
    ...DarkOutTheme,
    colors: {
      primary: Colors.primary,
      secondary: Colors.secondary,
      white: Colors.white,
      black: Colors.black,
      danger: Colors.red,
      text: Colors.black,
      background: Colors.secondary,
      grey0: Colors.greyDarkest,
      grey1: Colors.greyDarker,
      grey2: Colors.grey,
      grey3: Colors.greyLighter,
      grey4: Colors.greyLightest,
      grey5: Colors.white,
      greyOutline: Colors.grey,
    },
  },
  dark: {
    ...DarkOutTheme,
    colors: {
      primary: Colors.primaryDark,
      secondary: Colors.secondaryDark,
      white: Colors.black,
      black: Colors.white,
      danger: Colors.red,
      text: Colors.white,
      background: Colors.secondaryDark,
      grey0: Colors.greyDarkest,
      grey1: Colors.greyDarker,
      grey2: Colors.grey,
      grey3: Colors.greyLighter,
      grey4: Colors.greyLightest,
      grey5: Colors.white,
      greyOutline: Colors.grey,
    },
  },
};
