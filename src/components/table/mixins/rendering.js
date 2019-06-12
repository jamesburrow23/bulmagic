export default {
    props: {
        title: {
            type: String,
        },
        hasFixedHeader: {
            type: Boolean,
            default: false,
        },
        tableHeight: {
            type: String,
            default: 'auto',
        },
        isBordered: {
            type: Boolean,
            default: true,
        },
        isNarrow: {
            type: Boolean,
            default: true,
        },
        isStriped: {
            type: Boolean,
            default: true,
        },
        isFullWidth: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        tableContainerClasses() {
            return {
                'table-container is-margin-top-10px': true,
                'has-fixed-header': this.loadRemoteDataOnScroll || this.hasFixedHeader,
                'is-fullwidth': this.isFullWidth,
            }
        },
        tableWrapperClasses() {
            return {
                'table-wrapper is-marginless': true,
                'has-fixed-header': this.loadRemoteDataOnScroll || this.hasFixedHeader,
                'is-fullwidth': this.isFullWidth,
            };
        },
        tableClasses() {
            return {
                'table is-marginless': true,
                'is-bordered': this.isBordered,
                'is-narrow': this.isNarrow,
                'is-striped': this.isStriped,
                'is-fullwidth': this.isFullWidth,
                'has-fixed-header': this.loadRemoteDataOnScroll || this.hasFixedHeader,
            }
        },
        tableWrapperStyles() {
            return {
                height: this.tableHeight
            }
        },
    },
}
