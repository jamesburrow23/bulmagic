import Password from './Password'

const Plugin = {
    install(Vue) {
        Vue.component(Password.name, Password)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Password
}
