export default {
    props: {
        filterable: {
            type: Boolean,
            default: true,
        },
        usesLocalFiltering: {
            type: Boolean,
            default: false,
        },
        usesRemoteFiltering: {
            type: Boolean,
            default: false,
        },
        filterParameterName: {
            type: String,
            default: 'filter',
        }
    },
    data() {
        return {
            appliedFilters: {},
        }
    },
    watch: {
        appliedFilters: {
            handler() {
                if (this.usesRemoteFiltering) {
                    this.tableData = [];
                    if (this.currentPage !== 1) {
                        this.resetCurrentPage();
                    } else {
                        this.delayedGetRemoteTableData();
                    }
                }
            },
            deep: true,
        },
    },
    computed: {
        isFiltering() {
            return Object.keys(this.appliedFilters).length > 0;
        }
    },
    methods: {
        handleFilterInput(filterValue, column) {
            this.$set(this.appliedFilters, column.name, filterValue);
        },
        clearFilterInput(column) {
            this.$delete(this.appliedFilters, column.name);
        },
        rowMatchesLocalFilters(row) {
            let matches = true;

            _.forEach(this.appliedFilters, (filter, field) => {
                if (!String(row[field]).toLowerCase().includes(String(filter).toLowerCase())) {
                    matches = false
                }
            });

            return matches;
        },
    }
}
