/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * DinoLearn color palette and theme configuration
 */

// Brand colors from the web version
const navyBlue = '#43587C';
const skyBlue = '#9EC1D9';
const paleMint = '#E5FCFF';
const burntOrange = '#E17454';
const charcoalGray = '#2C3342';

export const DinoLearnColors = {
  navyBlue,
  skyBlue,
  paleMint,
  burntOrange,
  charcoalGray,
  lightGray: '#F5F5F5',
  white: '#FFFFFF',
  success: '#22c55e',  // Green for correct answers
  error: '#ef4444',    // Red for incorrect answers
  border: '#E0E0E0'
};

export const Colors = {
  light: {
    text: charcoalGray,
    background: paleMint,
    tint: burntOrange,
    icon: navyBlue,
    tabIconDefault: '#687076',
    tabIconSelected: burntOrange,
    card: '#FFFFFF',
    primary: navyBlue,
    secondary: skyBlue,
    accent: burntOrange,
    border: '#E0E0E0',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: burntOrange,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: burntOrange,
    card: '#222222',
    primary: skyBlue,
    secondary: navyBlue,
    accent: burntOrange,
    border: '#333333',
  },
};
