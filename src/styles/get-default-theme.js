import { alpha } from '@mui/system';

// Color palette
export const primary = {
  light: '#F0F7FF',
  main: '#0959AA',
  dark: '#02294F',
  contrastText: '#F0F7FF',
};

export const secondary = {
  light: '#D49CFC',
  main: '#6709AA',
  dark: '#2F024F',
  contrastText: '#F9F0FF',
};

export const warning = {
  main: '#F7B538',
  dark: '#F79F00',
};

export const error = {
  light: '#D32F2F',
  main: '#D32F2F',
  dark: '#B22A2A',
};

export const success = {
  light: '#C7F7C7',
  main: '#1F7A1F',
  dark: '#042F04',
};

export const grey = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
};

// Design tokens
const getDefaultTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      light: primary.light,
      main: primary.main,
      dark: primary.dark,
      contrastText: primary.contrastText,
    },
    secondary: {
      light: secondary.light,
      main: secondary.main,
      dark: secondary.dark,
      contrastText: secondary.contrastText,
    },
    warning: {
      main: warning.main,
      dark: warning.dark,
    },
    error: {
      light: error.light,
      main: error.main,
      dark: error.dark,
    },
    success: {
      light: success.light,
      main: success.main,
      dark: success.dark,
    },
    grey: {
      50: grey[50],
      100: grey[100],
      200: grey[200],
      300: grey[300],
      400: grey[400],
      500: grey[500],
      600: grey[600],
      700: grey[700],
      800: grey[800],
      900: grey[900],
    },
    divider: mode === 'dark' ? alpha(grey[600], 0.3) : alpha(grey[300], 0.5),
    background: {
      default: '#fff',
      paper: grey[50],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
    action: {
      selected: `${alpha(primary.light, 0.2)}`,
    },
  },
  typography: {
    fontFamily: ['"Arial", "sans-serif"'].join(','),
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});

export default getDefaultTheme;
