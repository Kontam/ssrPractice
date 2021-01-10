import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from '../../../modules/GlobalStyle';
import { ConnectedRouter } from 'connected-react-router';
import RootRouter from '../../../routes';
import { Store } from 'redux';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../../../modules/theme';

type Props = {
    store: Store,
    history: any,
}; 

const App: React.FC<Props> = ({ store, history }) => {
    return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ConnectedRouter history={history}>
                <RootRouter />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
    )
}

export default App;
