import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from './shared/components/atoms/HelloWorld';

ReactDOM.hydrate(
	<HelloWorld />,
	document.getElementById('root')
);

