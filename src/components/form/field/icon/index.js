import Icon from './Icon'

const Plugin = {
    install(Vue) {
        Vue.component(Icon.name, Icon)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}

export default Plugin

export {
    Icon
}
