import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#708690',
      main: '#445963',
      dark: '#1b3039',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000000',
    }
  },
  typography: {
    fontFamily: 'Lato',
    htmlFontSize: 10,
  },
  mixins: {
    toolbar: {
      minHeight: '4.5rem',
      '@media (min-width:600px)': {
        minHeight: '45px'
      }

    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
