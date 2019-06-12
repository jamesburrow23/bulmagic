<template>
    <div :class="fieldClasses">
        <bulmagic-form-field-label v-if="label" v-bind="_props"></bulmagic-form-field-label>
        <div :class="controlClasses">
            <input :class="['input', elementClasses]"
                   :type="computedType"
                   v-model="interface"
                   @focus="$emit('focus')"
                   @blur="$emit('blur')"
                   v-bind="element"
                   v-mask="inputMask"
                   v-if="inputMask"
                   ref="input"
            >
            <input :class="['input', elementClasses]"
                   :type="computedType"
                   v-model="interface"
                   @focus="$emit('focus')"
                   @blur="$emit('blur')"
                   v-bind="element"
                   v-else
                   ref="input"
            >

            <bulmagic-form-field-icon :icon="computedLeftIcon" v-if="hasIconsLeft && leftIcon" is-left></bulmagic-form-field-icon>
            <bulmagic-form-field-icon :icon="computedRightIcon" v-if="hasIconsRight || computedRightIcon" is-right></bulmagic-form-field-icon>
        </div>
        <template v-if="validationErrors.length > 0">
            <p class="help has-text-danger">{{ validationErrors[0] }}</p>
        </template>
    </div>
</template>

<script>
    import FieldMixin from '../mixin'
    import {mask} from 'vue-the-mask'

    export default {
        name: 'BulmagicFormFieldInput',
        inheritAttrs: false,
        directives: {
            mask
        },
        mixins: [
            FieldMixin,
        ],
    }
</script>
