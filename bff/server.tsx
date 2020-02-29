import express, { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ssrLoger from './middleware/ssrLoger';
import RootRouter from '../src/shared/routes';
import { StaticRouter } from 'react-router-dom';

import render from './components/HTML';

const app = express();
app.use(ssrLoger);
app.use(express.static(__dirname + '/public'));

app.get('*', (req: Request, res: Response) => {
   const content = renderToString(
        <StaticRouter location={req.url} context={{}}>
            <RootRouter />
        </StaticRouter>
   );
   res.write(render(content));
   res.end(); 
});

app.listen(
    3000,
    () => {
        console.log("app is listening on port 3000")
    }
)