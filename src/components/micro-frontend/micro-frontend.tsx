import { Component, FunctionalComponent, h } from "preact";
import dispatchEvent, { eventsToDispatch } from '../../utils/events';

interface MicroFrontendProps {
    name: string;
    host: string;
    history?: any;
}

class MicroFrontend extends Component<MicroFrontendProps> {
    componentDidMount() {
        const { name, host } = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `${host}/${"bundle.js"}`;
        script.onload = this.renderMicroFrontend
        document.head.appendChild(script);
    }

    /**
     * inform micro frontend to render the app
     */
    renderMicroFrontend = () => {
        const { name } = this.props;

        const history = (window as any).customHistory;
        //we can pass props from here as well, like we are passing history
        (window as any)[`render${name}`](`${name}-container`, history);
        // E.g.: window.renderBrowse('browse-container', history);
        dispatchEvent(eventsToDispatch.MFE_LOADED, {name})
    }

    /**
     * inform micro frontend that app will unmount
     */
    componentWillUnmount() {
        const { name } = this.props;

        (window as any)[`unmount${name}`](`${name}-container`);
        dispatchEvent(eventsToDispatch.MFE_UNLOADED, {name})
    }

    render() {
        return <main style="padding: 56px 20px;" id={`${this.props.name}-container`} />;
    }
}

export default MicroFrontend;
