import { FunctionalComponent, h } from "preact";
import { Route, Router, Switch } from "react-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import BPAY from "../routes/bpay";
import Header from "./header";

import { createBrowserHistory, createHashHistory } from "history";
import { useState } from "preact/hooks";
import { eventsToDispatch } from "../utils/events";

const customBrowserHistory: any = ((window as any).customHistory = createBrowserHistory());

const App: FunctionalComponent = () => {
    let currentUrl: string;

    const [counter, setCounter] = useState(0);

    const onBpayProfileButtonClicked = (e: any) => {
        setCounter(e.detail.count);
    }

    window.addEventListener(eventsToDispatch.MFE_LOADED, (e) => {
        const subscribeBPAY = (window as any)[`subscribeBPAY`];
        const eventsBPAY = (window as any)[`customEventsBPAY`];
        if(eventsBPAY) {
            subscribeBPAY(eventsBPAY.MF_APP1_PROFILE_TIMER_CLICKED, onBpayProfileButtonClicked);
        }
    });

    window.addEventListener(eventsToDispatch.MFE_UNLOADED, (e) => {
        const unsubscribeBPAY = (window as any)[`unsubscribeBPAY`];
        const eventsBPAY = (window as any)[`customEventsBPAY`];
        if(eventsBPAY) {
            unsubscribeBPAY(eventsBPAY.MF_APP1_PROFILE_TIMER_CLICKED, onBpayProfileButtonClicked);
        }
    });

    return (
        <div id="app">
            <Header counter={counter} />
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
