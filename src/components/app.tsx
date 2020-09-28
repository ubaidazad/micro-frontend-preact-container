import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import BPAY from "../routes/bpay";
import Header from "./header";

import { createBrowserHistory, createHashHistory } from 'history';

const customBrowserHistory: any = (window as any).customHistory = createBrowserHistory();


const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Header />
            <Router history={customBrowserHistory} onChange={handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />

                {/* micro frontend urls */}
                <Route path="/bpay/**" component={BPAY} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
