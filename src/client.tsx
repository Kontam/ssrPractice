import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RootRouter from './shared/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialState, RootState, initializeStore } from './shared/redux/store';
import createBrowserhistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import GlobalStyle from './shared/modules/GlobalStyle';

declare var window: { INITIAL_STATE : Partial<RootState> };
const state = window.INITIAL_STATE || initialState;

const history = createBrowserhistory();
const store = initializeStore(history, state);

ReactDOM.hydrate(
	<Provider store={store}>
		<GlobalStyle />
		<ConnectedRouter history={history}>
			<Router>
				<RootRouter />
			</Router>
		</ ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

