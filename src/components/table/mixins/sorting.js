import { getConfig } from "../../../config";

export default {
    props: {
        sortable: {
            type: Boolean,
            default: true,
        },
        usesLocalSorting: {
            type: Boolean,
            default: false,
        },
        usesRemoteSorting: {
            type: Boolean,
            default: false,
        },
        sortParameterName: {
            type: String,
            default: 'sort',
        }
    },
    data() {
        return {
            sortingColumn: {},
        }
    },
    watch: {
        sortingColumn: {
            handler() {
                if (this.usesRemoteSorting) {
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
        isSorting() {
            return Object.keys(this.sortingColumn).length > 0;
        }
    },
    methods: {
        sortingColumnIconClasses(column) {
            let config = getConfig();
            let classes = {};

            classes[config.table.icons.fixedWidth] = true;
            classes[config.table.icons.sortUp] = this.sortingColumn.name === column.name && this.sortingColumn.direction === 'asc';
            classes[config.table.icons.sortDown] = this.sortingColumn.name === column.name && this.sortingColumn.direction === 'desc';
            classes[config.table.icons.sort] =  this.sortingColumn.name !== column.name;

            return classes;
        },
        sortColumn(column) {
            if (this.sortingColumn.name !== column.name) {
                this.sortingColumn = {};
            }

            let direction = 'asc';

            switch (this.sortingColumn.direction) {
                case 'desc':
                    direction = 'asc';
                    break;
                case 'asc':
                    direction = 'desc';
                    break;
            }

            this.sortingColumn = {...{}, ...{name: column.name, direction: direction}};

            if (this.usesLocalSorting) {
                this.tableData = _.orderBy(this.tableData, this.sortingColumn.name, this.sortingColumn.direction);
            }
        }
    }

}
