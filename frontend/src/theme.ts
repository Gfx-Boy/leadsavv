import { alpha, createTheme, darken, lighten } from '@mui/material/styles';

const BRAND_NAVY = '#0d1117'; // Dark navy
const BRAND_BLUE = '#1e3a8a'; // Blueish dark primary color
const BRAND_GREEN = '#1F8466';
const BRAND_RED = '#E81212';
const BRAND_YELLOW = '#F6DC9F';
const BRAND_PURPLE = '#6C0E7C';
const BRAND_BROWN = '#CC996C';
const STANDARD_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const MONOSPACE_FONT_FAMILY =
  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace';

const BASE_THEME = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    background: {
      default: '#0d1117', // Dark background color
      paper: '#161b22', // Slightly lighter dark color for components
    },
    text: {
      primary: '#c9d1d9', // Light gray for primary text
      secondary: '#8b949e', // Muted gray for secondary text
    },
  },
  typography: {
    fontFamily: STANDARD_FONT_FAMILY,
  },
});

const THEME = createTheme(BASE_THEME, {
  palette: {
    brand: {
      navy: BRAND_NAVY,
      blue: BRAND_BLUE,
      red: BRAND_RED,
      green: BRAND_GREEN,
      yellow: BRAND_YELLOW,
      purple: BRAND_PURPLE,
      brown: BRAND_BROWN,
    },
    success: {
      main: BRAND_GREEN,
      light: lighten(BRAND_GREEN, 0.15),
      dark: darken(BRAND_GREEN, 0.15),
    },
    error: {
      main: BRAND_RED,
      light: lighten(BRAND_RED, 0.15),
      dark: darken(BRAND_RED, 0.15),
    },
    cadet: {
      100: '#1c1f26',
      200: '#161b22',
      300: '#0d1117',
      400: '#0a0d12',
      500: '#050709',
    },
    highlight: {
      100: lighten(BRAND_YELLOW, 0.8),
      200: lighten(BRAND_YELLOW, 0.6),
      300: lighten(BRAND_YELLOW, 0.4),
      400: lighten(BRAND_YELLOW, 0.2),
      500: BRAND_YELLOW,
    },
    info: {
      main: BRAND_BLUE,
    },
    primary: {
      main: BRAND_BLUE,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #0d1117; /* Dark background */
          color: #c9d1d9; /* Light text */
        }
        address {
          font-style: normal;
        }
        fieldset {
          border: none;
          padding: 0;
        }
        pre {
          font-family: ${MONOSPACE_FONT_FAMILY};
          white-space: pre-wrap;
          font-size: 12px;
        }
      `,
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
        square: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#161b22', // Slightly lighter dark color for components
          color: '#c9d1d9', // Light text color
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          backgroundColor: BRAND_BLUE,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: darken(BRAND_BLUE, 0.2),
          },
        },
        textPrimary: {
          color: '#c9d1d9',
        },
        outlinedPrimary: {
          borderColor: '#c9d1d9',
          color: '#c9d1d9',
          '&:hover': {
            borderColor: '#ffffff',
            color: '#ffffff',
          },
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          elevation: 2,
        },
      },
      styleOverrides: {
        paper: {
          backgroundColor: '#161b22', // Drawer background
          color: '#c9d1d9', // Drawer text color
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22', // AppBar background
          color: '#c9d1d9', // AppBar text color
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: BASE_THEME.typography.pxToRem(12),
          backgroundColor: alpha('#c9d1d9', 0.9),
        },
      },
    },
  },
  typography: {
    fontFamily: BASE_THEME.typography.fontFamily,
    h1: {
      fontSize: BASE_THEME.typography.pxToRem(40),
      color: '#ffffff',
    },
    h2: {
      fontSize: BASE_THEME.typography.pxToRem(32),
      color: '#ffffff',
    },
    h3: {
      fontSize: BASE_THEME.typography.pxToRem(24),
      color: '#ffffff',
    },
    body1: {
      fontSize: BASE_THEME.typography.pxToRem(14),
      color: '#c9d1d9',
    },
    body2: {
      fontSize: BASE_THEME.typography.pxToRem(12),
      color: '#8b949e',
    },
  },
});

export default THEME;