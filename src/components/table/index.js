import Table from './Table'

const Plugin = {
    install(Vue) {
        Vue.component(Table.name, Table)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Table
}
