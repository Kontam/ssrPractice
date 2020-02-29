import express, { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ssrLoger from './middleware/ssrLoger';
import RootRouter from '../src/shared/routes';
import { StaticRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';

import render from './components/HTML';
import { initializeStore } from '../src/shared/redux/store';
import { ConnectedRouter } from 'connected-react-router';

const app = express();
app.use(ssrLoger);
app.use(express.static(__dirname + '/public'));

app.get('*', (req: Request, res: Response) => {

    const history = createMemoryHistory({
        initialEntries: [req.url],
        initialIndex: 0,
    })
    const store = initializeStore(history); 

   const content = renderToString(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <StaticRouter location={req.url} context={{}}>
                    <RootRouter />
                </StaticRouter>
            </ConnectedRouter>
        </Provider>
   );
   res.write(render(content, store.getState()));
   res.end(); 
});

app.listen(
    3000,
    () => {
        console.log("app is listening on port 3000")
    }
)