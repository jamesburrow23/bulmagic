<template>
    <div>
        <transition name="fade">
            <a v-if="filterValue" @click.prevent="clearFilter" class="is-vertically-aligned-middle is-size-7" :style="clearButtonStyles">
                Clear
            </a>
        </transition>
        <div :class="dropdownClasses">
            <div class="dropdown-trigger">
                <button :class="filterButtonClasses" @click="showFilter = !showFilter">
                    <i :class="filterIconClasses"></i>
                </button>
            </div>
            <div class="dropdown-menu" role="menu">
                <div class="dropdown-content is-padding-right-5px is-padding-left-5px">
                    <bulmagic-form-field-input v-bind="inputSettings"
                                            v-model="filterValue"
                                            ref="input"
                                            @blur="showFilter = false"
                                            @keydown.native.enter="showFilter = false"
                    ></bulmagic-form-field-input>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'BulmagicTableFilter',
        data() {
            return {
                showFilter: false,
                inputSettings: {
                    leftIcon: 'fal fa-search',
                    hasIconsLeft: true,
                    size: 'is-small',
                    isValid: false,
                    isRounded: true,
                },
                filterValue: null,
            }
        },
        watch: {
            showFilter(newValue) {
                if (newValue) {
                    this.$nextTick(() => {
                        this.$refs.input.$refs.input.focus();
                    });
                }
            },
            filterValue(newValue) {
                if (newValue) {
                    this.$emit('filtering', newValue);
                } else {
                    this.$emit('clearing');
                }
            }
        },
        computed: {
            dropdownClasses() {
                return {
                    'dropdown' : true,
                    'is-active' : this.showFilter,
                    'is-right': true,
                };
            },
            filterButtonClasses() {
                return {
                    'button is-small is-padding-5px is-height-auto': true,
                    'is-primary': this.filterValue,
                };
            },
            filterIconClasses() {
                return {
                    'fa-filter fa-fw': true,
                    'fal': !this.filterValue,
                    'fas': this.filterValue,
                }
            },
            clearButtonStyles() {
                return {
                    position: 'relative',
                    top: '1px',
                };
            }
        },
        methods: {
            clearFilter() {
                this.filterValue = null;
                this.$emit('clearing');
            }
        },
        mounted() {
            this.$refs.input.$refs.input.focus();
        }
    }
</script>
