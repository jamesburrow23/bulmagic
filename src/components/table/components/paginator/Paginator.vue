<template>
    <div>
        <div class="field has-addons">
            <div class="control">
                <button class="button has-text-weight-bold is-small" :disabled="!hasPreviousData" @click="$emit('decrementPage')">
                    <i class="far fa-angle-double-left"></i>
                </button>
            </div>
            <div class="control is-expanded">
                <div class="select is-fullwidth is-small">
                    <select v-model="newPerPage">
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="15">15 per page</option>
                        <option value="20">20 per page</option>
                        <option value="25">25 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button class="button has-text-weight-bold is-small" :disabled="!hasMoreData" @click="$emit('incrementPage')">
                    <i class="far fa-angle-double-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BulmagicTablePaginator',
        props: {
            tableData: {
                type: Array,
            },
            visibleTableData: {
                type: Array,
            },
            perPage: {
                type: [Number, String],
            },
            currentPage: {
                type: [Number, String],
            },
            lastPage: {
                type: [Number, String],
            }
        },
        data() {
            return {
                newPerPage: 10,
            }
        },
        watch: {
            newPerPage(newValue) {
                this.$emit('input', newValue);
            }
        },
        computed: {
            hasMoreData() {
                return this.visibleTableData.length >= this.perPage;
            },
            hasPreviousData() {
                return this.currentPage !== 1 || (this.visibleTableData.length > this.perPage && this.currentPage == this.lastPage);
            },
        },
        methods: {
            clearFilter() {
                this.filterValue = null;
                this.$emit('clearing');
            }
        },
        beforeMount() {
            this.newPerPage = this.perPage;
        },
    }
</script>
