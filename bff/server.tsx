import express, { Request, Response } from 'express';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import ssrLoger from './middleware/ssrLoger';
import { StaticRouter, matchPath } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import bodyParser from 'body-parser';
import { ServerStyleSheets as MaterialStyleSheets } from '@material-ui/core/styles';
const Fetchr = require('fetchr');

import BFFConst from './const';
import render from './components/HTML';
import { initializeStore } from '../src/shared/redux/store';
import longosService from './services/longosService';
import App from '../src/shared/components/pages/App';
import routes from '../src/shared/routes/routes';

const app = express();

app.use(bodyParser.json());
Fetchr.registerService(longosService);
app.use(BFFConst.API_ENDPOINT, Fetchr.middleware());

app.use(ssrLoger);
app.use(express.static(__dirname + '/public'));

app.get('*', (req: Request, res: Response) => {
    const history = createMemoryHistory({
        initialEntries: [req.url],
        initialIndex: 0,
    })
    const store = initializeStore(history);
    const prepare = () => {
        // From official example
        // See: https://reacttraining.com/react-router/web/guides/server-rendering
        const promises: Function[] = [];
        routes.some(route => {
            const match = matchPath(req.path, route);
            if (match) promises.push(route.loadData(store, match));
            return match;
        })
        return Promise.all(promises);
    }
    
    const materialStyles = new MaterialStyleSheets()
    const sheet = new ServerStyleSheet();
    let content = "";
    let styleTags = "";

    prepare().then(() => {
        try {
            content = renderToString(materialStyles.collect(sheet.collectStyles(
                <StaticRouter location={req.url} context={{}}>
                    <App store={store} history={history} />
                </StaticRouter>
            )));
            styleTags = sheet.getStyleTags();
        }catch (error) {
            console.log("server.tsx", error);
        } finally {
            sheet.seal();
        }
       res.write(render(content, styleTags, materialStyles.toString() ,store.getState()));
       res.end(); 
    })
    
});

app.listen(
    3000,
    () => {
        console.log("app is listening on port 3000")
    }
)