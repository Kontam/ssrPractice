import React from 'react';
import { Switch, Route, BrowserRouter, } from 'react-router-dom';
import Home from '../components/auganisms/Home';
import About from '../components/auganisms/About';

const RootRouter = () => (
    <Switch>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/">
            <Home />
        </Route>
  </Switch>
)

export default RootRouter;