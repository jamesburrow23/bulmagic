import Filter from './Filter'

const Plugin = {
    install(Vue) {
        Vue.component(Filter.name, Filter)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Filter
}
