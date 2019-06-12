<template>
    <label :class="['label is-marginless has-text-weight-normal', elementClasses]" v-html="label"></label>
</template>

<script>
    import FieldMixin from '../mixin';

    export default {
        name: 'BulmagicFormFieldLabel',
        mixins: [
            FieldMixin,
        ],
        computed: {
            elementClasses() {
                return {
                    [this.class]: this.class !== undefined,
                    'is-success': this.isValid,
                    'is-danger': this.validationErrors.length > 0,
                    [this.textWeight]: true,
                    'has-text-danger': this.validationErrors.length > 0,
                    'has-text-success': this.isValid,
                };
            },
        }
    }
</script>
