import { getConfig } from "../../../config";

export default {
    props: {
        isEditable: {
            type: Boolean,
        },
        editingSchema: {
            type: Object,
        },
        editingLayout: {
            type: Array,
        },
        formTitle: {
            type: String,
        },
        updateRowParamName: {
            type: String,
            default: 'ajax',
        },
        rowPrimaryKey: {
            type: String,
            default: 'uuid',
        }
    },
    data() {
        return {
            isModalEditing: false,
            editingRow: null,
            editingRowIndex: null,
        }
    },
    computed: {
        editColumnIconClass() {
            let config = getConfig();
            let classes = {};

            classes[config.table.icons.edit] = true;

            return classes;
        },
    },
    methods: {
        startModalEditing(row, rowIndex) {
            this.editingRow = row;
            this.editingRowIndex = rowIndex;
            this.isModalEditing = true;
        },
        stopModalEditing() {
            this.isModalEditing = false;
            this.editingRow = null;
            this.editingRowIndex = null;
        },
        handleEditingInput(field, value) {
            this.$emit('editing-row', field, value);
        },
        handleRowUpdated(response, formData) {
            let rowIndex = _.findIndex(this.tableData, row => {
                if (row[this.rowPrimaryKey]) {
                    return row[this.rowPrimaryKey] === this.editingRow[this.rowPrimaryKey];
                }

                console.warn('Unable to locate row in tableData, please confirm that your rowPrimaryKey property is set correctly');

                return false;
            });

            if (rowIndex >= 0) {
                let row = this.tableData[rowIndex];

                let updatedRow = _.has(response.data, 'row') ? response.data.row : formData;

                row = {...row, ...updatedRow};

                this.$set(this.tableData, rowIndex, row);
            }

            this.$emit('row-updated', response, formData);
        },
        handleRowUpdateFailed(response) {
            this.$emit('row-update-failed', response);
        }
    }
}
