export default {
    props: {
        data: {
            type: [Array, Object]
        },
        hasRemoteData: {
            type: Boolean,
            default: false,
        },
        ajax: {
            type: String,
        },
        usesLocalPagination: {
            type: Boolean,
            default: false,
        },
        usesRemotePagination: {
            type: Boolean,
            default: false,
        },
        loadRemoteDataOnScroll: {
            type: Boolean,
            default: false,
        },
        perPage: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            lastPage: 1,
            newPerPage: 10,
            isLoading: false,
            oldScrollPosition: 0,
            loadedPages: [],
            totalTableDataLength: 0,
        }
    },
    watch: {
        data: {
            handler(newValue) {
                if (!this.hasRemoteData) {
                    this.tableData = newValue;
                }
            },
            deep: true,
        },
        currentPage() {
            if (this.usesRemotePagination && this.hasRemoteData) {
                this.delayedGetRemoteTableData();
            }
        },
        newPerPage() {
            if (this.hasRemoteData) {
                this.delayedGetRemoteTableData();
            }
        },
        visibleTableData() {
            this.$nextTick(() => {
                if (this.hasFixedHeader || this.loadRemoteDataOnScroll) {
                    this.setCalculatedColumnWidths();
                }
            });
        }
    },
    computed: {
        remoteDataQueryParams() {
            let params = {};

            if (this.isFiltering) {
                params[this.filterParameterName] = this.appliedFilters;
            }

            if (this.isSorting) {
                params[this.sortParameterName] = this.sortingColumn.direction === 'asc' ? this.sortingColumn.name : `-${this.sortingColumn.name}`;
            }

            if (this.usesRemotePagination) {
                params.page = this.currentPage;
                params.perPage = this.newPerPage;
            }

            return $.param(params);
        },
        visibleTableData() {
            if (this.tableData) {
                if (this.usesLocalPagination) {
                    this.totalTableDataLength = this.tableData.length;
                }

                let tableData = this.tableData;

                tableData = _.filter(this.tableData, row => {
                    let isVisible = true;

                    if (this.usesLocalFiltering) {
                        isVisible = this.rowMatchesLocalFilters(row);
                    }

                    if (isVisible) {
                        isVisible = row.visible !== false;
                    }

                    return isVisible;
                });

                if (this.usesLocalPagination) {
                    this.lastPage = parseFloat(this.tableData.length / this.newPerPage).toFixed(0);

                    if (tableData.length <= this.newPerPage) {
                        return tableData;
                    }

                    if (tableData.length > this.newPerPage) {
                        let start = (this.currentPage - 1) * this.newPerPage;
                        let end = parseInt(start, 10) + parseInt(this.newPerPage, 10);

                        return tableData.slice(start, end);
                    }
                }

                return tableData;
            }

            return [];
        }
    },
    methods: {
        handleScroll(event) {
            if (event.target.scrollTop >= this.oldScrollPosition) {
                this.oldScrollPosition = event.target.scrollTop;
                let isAtBottom = event.target.scrollTop >= (event.target.scrollHeight - event.target.offsetHeight);

                if (isAtBottom && this.loadRemoteDataOnScroll && this.visibleTableData.length !== this.totalTableDataLength) {
                    this.currentPage++;
                }
            }
        },
        getRemoteTableData() {
            this.isLoading = true;

            return axios.get(`${this.ajax}?${this.remoteDataQueryParams}`)
                .then(response => {
                    this.isLoading = false;

                    if (this.usesLocalFiltering) {
                        this.unfilteredTableData = response.data.rows;
                    }

                    if (_.has(response, 'data.total')) {
                        this.totalTableDataLength = response.data.total;
                    }

                    if (this.loadRemoteDataOnScroll) {
                        _.forEach(response.data.rows, row => {
                            this.tableData.push(row);
                        });
                    } else {
                        this.tableData = response.data.rows;
                    }
                })
                .catch(() => {
                    this.isLoading = true;
                });
        },
        resetCurrentPage() {
            this.oldScrollPosition = 0;
            this.currentPage = 1;
        }
    },
    created() {
        this.delayedGetRemoteTableData = _.debounce( () => {
            this.getRemoteTableData();
        },200);
    }
}
