import {CardStyleInterpolators} from '@react-navigation/stack';

export const NavOption = {
  rightSlide: {
    gestureEnabled: true,
    gestureResponseDistance: {horizontal: 10, vertical: 10},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  },
  centerFade: {
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  },
};

