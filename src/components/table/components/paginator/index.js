import Paginator from './Paginator'

const Plugin = {
    install(Vue) {
        Vue.component(Paginator.name, Paginator)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Paginator
}
