import {Theme} from 'react-native-elements';

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module 'react-native-elements' {
  export interface Colors {
    background: string;
    text: string;
    danger: string;
    header: string;
  }
}

export const Colors = {
  primary: '#CCC330',
  secondary: '#E3E3FF',
  primaryDark: '#4F4000',
  secondaryDark: '#222',
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
      marginVertical: 0,
      marginHorizontal: 5,
    },
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderRadius: 100,
    },
  },
  Header: {
    centerComponent: {
      style: {
        fontSize: 17,
        fontWeight: 'bold',
      },
    },
  },
  Text: {
    style: {
      fontSize: 15,
    },
  },
};

export const GlobalTheme: { dark: Theme, light: Theme, current: string } = {
  current: 'light',
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
      header: Colors.primary,
      grey0: Colors.greyDarkest,
      grey1: Colors.greyDarker,
      grey2: Colors.grey,
      grey3: Colors.greyLighter,
      grey4: Colors.greyLightest,
      grey5: Colors.white,
      greyOutline: Colors.grey,
    },
    Button: {
      ...DarkOutTheme.Button,
      containerStyle: {
        ...DarkOutTheme.Button?.containerStyle as {},
        borderColor: Colors.black,
      },
      titleStyle: {
        color: Colors.black,
      },
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
      header: Colors.secondaryDark,
      grey0: Colors.greyDarkest,
      grey1: Colors.greyDarker,
      grey2: Colors.grey,
      grey3: Colors.greyLighter,
      grey4: Colors.greyLightest,
      grey5: Colors.white,
      greyOutline: Colors.grey,
    },
    Button: {
      ...DarkOutTheme.Button,
      containerStyle: {
        ...DarkOutTheme.Button?.containerStyle as {},
        borderColor: Colors.white,
      },
      titleStyle: {
        color: Colors.white,
      },
    },
  },
};
