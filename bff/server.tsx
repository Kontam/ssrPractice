import express, { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import HelloWorld from '../src/shared/components/atoms/HelloWorld';

const app = express();

app.get('*', (req: Request, res: Response) => {
   const content = renderToString(
       <div id="root">
           <HelloWorld />
       </div>
   );
   res.write(content);
   res.end(); 
});

app.listen(
    3000,
    () => {
        console.log("app is listening on port 3000")
    }
)