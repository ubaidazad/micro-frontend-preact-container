import { FunctionalComponent, h } from "preact";
import { Route, Router, Switch } from "react-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import BPAY from "../routes/bpay";
import Header from "./header";

import { createBrowserHistory, createHashHistory } from "history";

const customBrowserHistory: any = ((window as any).customHistory = createBrowserHistory());

const App: FunctionalComponent = () => {
    let currentUrl: string;

    return (
        <div id="app">
            <Header />
            <Router history={customBrowserHistory}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/profile/"
                        exact
                        component={Profile}
                        user="me"
                    />
                    <Route path="/profile/:user" exact component={Profile} />

                    {/* micro frontend urls */}
                    <Route path="/bpay" component={BPAY} />
                    <NotFoundPage default />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
