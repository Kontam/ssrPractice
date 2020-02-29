import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RootRouter from './shared/routes';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.hydrate(
		<Router>
			<RootRouter />
		</Router>,
	document.getElementById('root')
);

