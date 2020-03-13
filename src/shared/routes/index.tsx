import React from 'react';
import { Switch, Route, BrowserRouter, } from 'react-router-dom';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import { Store } from 'redux';

type Props = {
    store: Store,
}

const RootRouter: React.FC<Props> = ({ store }) => (
    <Switch>
        <Route
            path="/about"
            render={() => {
            // const a = About.prototype.getInitialProps(store);
            return <About />
        }}
        />
        <Route
            path="/"
            render={() => <Home />}
        />
  </Switch>
)

export default RootRouter;