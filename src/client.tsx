import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { INITIAL_STATE, RootState, initializeStore } from './shared/redux/store';
import createBrowserhistory from 'history/createBrowserHistory';
import App from './shared/components/pages/App';

declare const window: { INITIAL_STATE : Partial<RootState> };
const state = window.INITIAL_STATE || INITIAL_STATE;

const history = createBrowserhistory();
const store = initializeStore(history, state);

ReactDOM.hydrate(
	<App store={store} history={history} />,
	document.getElementById('root')
);

