import './scss/app.scss';

import * as components from './components'
import { setConfig } from "./config";

const Bulmagic = {
    install(Vue, opts) {
        setConfig(opts);
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
    }
};

export default Bulmagic
