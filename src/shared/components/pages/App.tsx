import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import GlobalStyle from '../../modules/GlobalStyle';
import { ConnectedRouter } from 'connected-react-router';
import RootRouter from '../../routes';

type Props = {
    store: Store,
    history: any,
}

const App: React.FC<Props> = ({ store, history }) => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <ConnectedRouter history={history}>
                <RootRouter />
            </ConnectedRouter>
        </Provider>
    )
}

export default App;
