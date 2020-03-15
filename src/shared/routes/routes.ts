import { ReactChildren } from "react";
import About from "../components/pages/About";
import { Store } from "redux";
import Home from "../components/pages/Home";

type RouteProps = {
    path: string,
    component: React.FC
    loadData: Function,
}

const routes: RouteProps[] = [
    {
        path: "/about",
        component: About,
        loadData: (store: Store, match: any) => About.prototype.getInitialProps(store)
    },
    {
        path: "/",
        component: Home,
        loadData: () => {},
    }
];

export default routes;