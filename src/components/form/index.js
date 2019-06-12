import Form from './Form'

const Plugin = {
    install(Vue) {
        Vue.component(Form.name, Form)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Form
}
