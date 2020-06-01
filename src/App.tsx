import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Profile from './components/Profile';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFF',
        },
        secondary: {
            main: '#8C8C8C',
        },
        background: {
            default: '#0A3282',
            paper: '#0F48BB',
        },
        text: {
            primary: '#FFF',
        },
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Router>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/:indicatorKey/serie" component={Details} />
                        <Route exact path="/profile" component={Profile} />
                    </Router>
                </Layout>
            </ThemeProvider>
        </div>
    );
};

export default App;
