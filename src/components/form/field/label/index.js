import Label from './Label'

const Plugin = {
    install(Vue) {
        Vue.component(Label.name, Label)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Label
}
