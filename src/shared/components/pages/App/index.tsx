import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import RootRouter from '../../../routes';
import { Store } from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../modules/theme';

type Props = {
    store: Store,
    history: any,
}; 

const App: React.FC<Props> = ({ store, history }) => {
    return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ConnectedRouter history={history}>
                <RootRouter />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
    )
}

export default App;
