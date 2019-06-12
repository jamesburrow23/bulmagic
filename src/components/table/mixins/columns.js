export default {
    props: {
        schema: {
            type: [Array, Object]
        }
    },
    computed: {
        visibleColumns() {
            return this.schema;
        },
        visibleColumnCount() {
            let count = Object.keys(this.visibleColumns).length;

            return this.isEditable ? count + 1 : count;
        }
    },
    methods: {
        columnClasses(column) {
            return {

            };
        },
        columnStyles(column) {
            return {
                width: `${column.columnWidth}px`,
            };
        },
        setColumnKeys() {
            _.forEach(this.schema, column => {
                column._key = _.random(0, 999999999999999);
            });
        },
        setCalculatedColumnWidths() {
            _.forEach(this.schema, (column, index) => {
                this.schema[index] = {...column, columnWidth: this.calculateContentLength(column)};
            });
        },
        calculateContentLength(column) {
            let labelLength = this.getTextWidth(column.label, '400 14px Cantarell, sans-serif', 100);

            let rows = _.get(this.$refs, `${column._key}_column`);

            let widths = [];

            if (rows) {
                _.forEach(rows, element => {
                    widths.push(element.offsetWidth);
                });
            }

            let longestRow = _.max(widths);

            return longestRow > labelLength ? Math.ceil(longestRow) : Math.ceil(labelLength);
        }
    }
}
