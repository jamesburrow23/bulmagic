<template>
    <span :class="iconClasses">
        <i :class="icon"></i>
    </span>
</template>

<script>
    export default {
        name: 'BulmagicFormFieldIcon',
        props: {
            icon: {
                type: String,
            },
            isLeft: {
                type: Boolean,
            },
            isRight: {
                type: Boolean,
            },
        },
        computed: {
            iconClasses() {
                return {
                    'icon': true,
                    'is-left': this.isLeft,
                    'is-right': this.isRight,
                }
            }
        },
    }
</script>
