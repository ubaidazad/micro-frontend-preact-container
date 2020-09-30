import "./style/index.css";
import App from "./components/app.tsx";

window.subscribeHost = (eventName, eventHandler) => {
    window.addEventListener(eventName, eventHandler);
}

export default App;
