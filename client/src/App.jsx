/* This module wraps the functional parts of the application with the application's   *
 * material-ui theme and with its routing layer.                                      */
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import themeValues from './theme';

const theme = createMuiTheme(themeValues);

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
