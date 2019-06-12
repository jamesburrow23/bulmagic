import './scss/app.scss';

import * as components from './components'

const Bulmagic = {
    install(Vue) {
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
    }
};

export default Bulmagic
