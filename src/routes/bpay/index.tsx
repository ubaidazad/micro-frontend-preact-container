import { FunctionalComponent, h } from "preact";
import MicroFrontend from "../../components/micro-frontend/micro-frontend";


const BPAY: FunctionalComponent = (props) => {
    return (
        <MicroFrontend name="BPAY" host="http://localhost:8090" />
    );
};

export default BPAY;
