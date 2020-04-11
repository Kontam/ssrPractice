import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from '../../../modules/GlobalStyle';
import { ConnectedRouter } from 'connected-react-router';
import RootRouter from '../../../routes';
import { Store } from 'redux';

type Props = {
    store: Store,
    history: any,
}; 

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
