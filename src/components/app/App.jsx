import { lazy, Suspense, createRef } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useLocation,
    matchPath
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() =>
    import("../SingleComicPage.jsx/SingleComicPage")
);

const routes = [
    {
        path: "/",
        exact: true,
        Component: MainPage,
        nodeRef: createRef(),
    },
    {
        path: "/comics",
        exact: true,
        Component: ComicsPage,
        nodeRef: createRef(),
    },
    {
        path: "/comics/:comicId",
        exact: true,
        Component: SingleComicPage,
        nodeRef: createRef(),
    },
    {
        path: "*",
        Component: Page404,
        nodeRef: createRef(),
    },
];

const AppContent = () => {
    const location = useLocation();

    const currentRoute = routes.find(route =>
        matchPath(location.pathname, {
            path: route.path,
            exact: route.exact
        })
    ) || routes[routes.length - 1];

    console.log(location);

    return (
        <div className="app">
            <AppHeader />
            <main>
                <Suspense fallback={<Spinner />}>
                    <SwitchTransition>
                        <CSSTransition
                            key={location.pathname}
                            nodeRef={currentRoute.nodeRef}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                        >
                            <div ref={currentRoute.nodeRef} className="page">
                                <Switch location={location}>
                                    {routes.map(({ path, exact, Component }) => (
                                        <Route
                                            key={path}
                                            path={path}
                                            exact={exact}
                                            component={Component}
                                        />
                                    ))}
                                </Switch>
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </Suspense>
            </main>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
