<template>
    <div>
        <bulmagic-form-field-label v-if="label" v-bind="_props"></bulmagic-form-field-label>

        <div :class="['is-marginless', passwordFieldClasses, fieldClasses]">
            <div :class="['is-expanded', controlClasses]" :style="{zIndex: 2}">
                <input :class="['input', elementClasses]"
                       :type="computedType"
                       v-model="interface"
                       @focus="handleFocus"
                       @blur="handleBlur"
                       v-bind="element"
                >

                <bulmagic-form-field-icon :icon="computedLeftIcon" v-if="hasIconsLeft && leftIcon" is-left></bulmagic-form-field-icon>
                <bulmagic-form-field-icon :icon="computedRightIcon" v-if="hasIconsRight || computedRightIcon" is-right></bulmagic-form-field-icon>
            </div>

            <transition name="slide" v-if="hasPasswordRevealButton">
                <div class="control" v-if="isFocused" :style="{zIndex: 1}" @mousedown.prevent="isPasswordVisible =! isPasswordVisible">
                    <a class="button is-primary">
                        <i :class="['fal', passwordButtonIcon]"></i>
                    </a>
                </div>
            </transition>
        </div>

        <template v-if="validationErrors">
            <p class="help has-text-danger">{{ validationErrors[0] }}</p>
        </template>
    </div>
</template>

<style scoped>
    .slide-leave-active,
    .slide-enter-active {
        transition: .3s;
    }
    .slide-enter {
        transform: translate(-100%, 0);
        opacity: 0.2;
    }
    .slide-leave-to {
        transform: translate(-100%, 0);
        opacity: 0;
    }
</style>

<script>
    import FieldMixin from '../mixin';

    export default {
        name: 'BulmagicFormFieldPassword',
        inheritAttrs: false,
        mixins: [
            FieldMixin,
        ],
        props: {
            hasPasswordRevealButton: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                isPasswordVisible: false,
            }
        },
        computed: {
            passwordFieldClasses() {
                return {
                    'has-addons' : this.hasPasswordRevealButton,
                };
            },
            computedType() {
                return this.isPasswordVisible ? 'text' : 'password';
            },
            passwordButtonIcon() {
                return this.isPasswordVisible ? 'fa-eye-slash' : 'fa-eye';
            }
        },
        methods: {
            handleBlur(e) {
                this.isFocused = false;
                this.isPasswordVisible = false;
            }
        },
    }
</script>
