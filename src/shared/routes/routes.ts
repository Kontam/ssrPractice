import About from "../components/pages/About";
import Choice from "../components/pages/Choice";
import { Store } from "redux";
import Home from "../components/pages/Home";
import { AuthorityLevel } from "../redux/modules/login";


type RouteProps = {
    path: string,
    component: React.FC
    loadData: Function,
    authorityLevel: AuthorityLevel,
}

const routes: RouteProps[] = [
    {
        path: "/choice",
        component: Choice,
        loadData: (store: Store, match: any) => Choice.prototype.getInitialProps(store),
        authorityLevel: About.prototype.authorityLevel,
    },
    {
        path: "/about",
        component: About,
        loadData: (store: Store, match: any) => About.prototype.getInitialProps(store),
        authorityLevel: About.prototype.authorityLevel,
    },
    {
        path: "/",
        component: Home,
        loadData: () => {},
        authorityLevel: Home.prototype.authorityLevel,
    }
];

export default routes;
