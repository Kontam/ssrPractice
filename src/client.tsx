import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialState, RootState, initializeStore } from './shared/redux/store';
import createBrowserhistory from 'history/createBrowserHistory';
import App from './shared/components/pages/App';

declare var window: { INITIAL_STATE : Partial<RootState> };
const state = window.INITIAL_STATE || initialState;

const history = createBrowserhistory();
const store = initializeStore(history, state);

ReactDOM.hydrate(
	<App store={store} history={history} />,
	document.getElementById('root')
);

