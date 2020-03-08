import express, { Request, Response } from 'express';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import ssrLoger from './middleware/ssrLoger';
import RootRouter from '../src/shared/routes';
import { StaticRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import bodyParser from 'body-parser';
import { ThemeProvider, createMuiTheme, ServerStyleSheets as MaterialStyleSheets } from '@material-ui/core/styles';
const Fetchr = require('fetchr');

import BFFConst from './const';
import render from './components/HTML';
import { initializeStore } from '../src/shared/redux/store';
import { ConnectedRouter } from 'connected-react-router';
import longosService from './services/longosService';
import GlobalStyle from '../src/shared/modules/GlobalStyle';

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
    const materialStyles = new MaterialStyleSheets()

    const sheet = new ServerStyleSheet();
    let content = "";
    let styleTags = "";
    try {
        content = renderToString(materialStyles.collect(sheet.collectStyles(
                <Provider store={store}>
                    <GlobalStyle />
                    <ConnectedRouter history={history}>
                        <StaticRouter location={req.url} context={{}}>
                            <RootRouter />
                        </StaticRouter>
                    </ConnectedRouter>
                </Provider>
        )));
        styleTags = sheet.getStyleTags();
    }catch (error) {
        console.log("server.tsx", error);
    } finally {
        sheet.seal();
    }
   res.write(render(content, styleTags, materialStyles.toString() ,store.getState()));
   res.end(); 
});

app.listen(
    3000,
    () => {
        console.log("app is listening on port 3000")
    }
)