import { Component, FunctionalComponent, h } from "preact";

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

        // fetch(`${host}/asset-manifest.json`)
        //     .then(res => res.json())
        //     .then(manifest => {
        //         const script = document.createElement("script");
        //         script.id = scriptId;
        //         script.src = `${host}${manifest["main.js"]}`;
        //         script.onload = this.renderMicroFrontend;
        //         document.head.appendChild(script);
        //     });

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

        (window as any)[`render${name}`](`${name}-container`, history);
        // E.g.: window.renderBrowse('browse-container', history);
    }

    /**
     * inform micro frontend that app will unmount
     */
    componentWillUnmount() {
        const { name } = this.props;

        (window as any)[`unmount${name}`](`${name}-container`);
    }

    render() {
        return <main style="padding: 56px 20px;" id={`${this.props.name}-container`} />;
    }
}

export default MicroFrontend;
