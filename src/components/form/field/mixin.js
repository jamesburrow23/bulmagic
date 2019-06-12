export default {
    props: {
        value: [String],
        name: {
            type: String,
        },
        size: {
            type: String,
        },
        label: {
            type: String,
        },
        store: {
            type: String,
        },
        leftIcon: {
            type: String,
        },
        rightIcon: {
            type: String,
        },
        textWeight: {
            type: String,
            default: 'has-text-weight-light',
        },
        element: {
            type: Object,
        },
        validationErrors: {
            type: Array,
            default: () => [],
        },
        isValid: {
            type: Boolean,
        },
        isField: {
            type: Boolean,
            default: true,
        },
        isControl: {
            type: Boolean,
            default: true,
        },
        hasAddons: {
            type: Boolean,
        },
        hasIconsLeft: {
            type: Boolean,
        },
        hasIconsRight: {
            type: Boolean,
        },
        isRounded: {
            type: Boolean,
        },
        inputMask: {
            type: [String, Array],
        },
    },
    data() {
        return {
            isFocused: false,
        }
    },
    computed: {
        interface: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        fieldClasses() {
            return {
                'field' : this.isField,
                'has-addons': this.hasAddons,
            };
        },
        controlClasses() {
            return {
                'control' : this.isControl !== false,
                'has-icons-left': this.hasIconsLeft !== false,
                'has-icons-right': this.hasIconsRight !== false || this.computedRightIcon,
                'has-text-danger': this.validationErrors.length > 0,
                // 'has-text-success': this.isValid,
            };
        },
        elementClasses() {
            return {
                [this.class]: this.class !== undefined,
                [this.size]: this.size !== undefined,
                'is-success': this.isValid,
                'is-danger': this.validationErrors.length > 0,
                [this.textWeight]: true,
                'is-rounded': this.isRounded,
                // 'has-text-danger': this.validationErrors.length > 0,
                // 'has-text-success': this.isValid,
            };
        },
        computedLeftIcon() {
            if (this.validationErrors.length > 0) {
                return 'fal fa-exclamation has-text-danger';
            }

            if (this.isValid) {
                return 'fal fa-badge-check has-text-success';
            }

            return this.leftIcon;
        },
        computedRightIcon() {
            return this.rightIcon;
        },
        computedType() {
            return this.element && this.element.type ? this.element.type : 'input';
        }
    },
    methods: {
        handleFocus(e) {
            this.isFocused = true;
            this.$emit('focus');
        },
        handleBlur(e) {
            this.isFocused = false;
            this.$emit('blur');
        }
    }
}
