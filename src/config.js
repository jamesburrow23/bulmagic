const DEFAULT_CONFIG = {
    table: {
        icons: {
            fixedWidth: 'fal fa-fw',
            sortUp: 'fas fa-sort-up',
            sortDown: 'fas fa-sort-down',
            sort: 'fa-sort',
        },
    },
};

export const isCallable = (func) => typeof func === 'function';

export const assign = (target, ...others) => {
    if (isCallable(Object.assign)) {
        return Object.assign(target, ...others);
    }

    /* istanbul ignore next */
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    /* istanbul ignore next */
    const to = Object(target);
    /* istanbul ignore next */
    others.forEach(arg => {
        // Skip over if undefined or null
        if (arg != null) {
            Object.keys(arg).forEach(key => {
                to[key] = arg[key];
            });
        }
    });
    /* istanbul ignore next */
    return to;
};

export let currentConfig = assign({}, DEFAULT_CONFIG);
export const getConfig = () => currentConfig;

export const setConfig = (newConf) => {
    currentConfig = assign({}, currentConfig, newConf);
};