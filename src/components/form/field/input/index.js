import Input from './Input'

const Plugin = {
    install(Vue) {
        Vue.component(Input.name, Input)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Input
}
