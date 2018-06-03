export default {
  palette: {
    primary: {
      light: '#708690',
      main: '#445963',
      dark: '#1b3039',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Lato',
    htmlFontSize: 10,
  },
  mixins: {
    toolbar: {
      minHeight: '4.5rem',
      '@media (min-width:600px)': {
        minHeight: '45px',
      },
    },
  },
  spacing: {
    unit: 10,
  },
};
