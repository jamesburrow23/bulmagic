<template>
    <div :class="tableContainerClasses">
        <div class="level is-marginless is-padding-bottom-5px">
            <div class="level-item has-content-justified-flex-start">
                <div class="level-left">
                    <slot name="top-left">
                        <p class="subtitle" v-html="title"></p>
                    </slot>
                </div>
            </div>
            <div class="level-item has-content-justified-flex-end">
                <div class="level-right">
                    <slot name="top-right" />

                    <bulmagic-table-paginator :table-data="tableData"
                                                      :visible-table-data="visibleTableData"
                                                      :per-page="newPerPage"
                                                      :current-page="currentPage"
                                                      :last-page="lastPage"
                                                      @input="$event => newPerPage = $event"
                                                      @incrementPage="currentPage++"
                                                      @decrementPage="currentPage--"
                                                      v-if="(usesLocalPagination || usesRemotePagination) && !loadRemoteDataOnScroll"
                    ></bulmagic-table-paginator>
                </div>
            </div>
        </div>

        <div :class="tableWrapperClasses" :style="tableWrapperStyles" @scroll="handleScroll">
            <table :class="tableClasses"
                   ref="table"
            >
                <thead>
                    <slot name="pre-thead" />
                    <tr>
                        <th v-if="isEditable" width="75"></th>
                        <th v-for="(column, index) in visibleColumns" v-bind:key="index" :class="columnClasses(column)" :style="columnStyles(column)" :ref="`${column._key}_header`">
                            <div class="level">
                                <div class="level-item has-content-justified-flex-start cursor-is-pointer" v-if="sortable" @click="sortColumn(column)">
                                    <i :class="sortingColumnIconClasses(column)" v-if="sortable && column.sortable !== false"></i> {{column.label}}
                                </div>

                                <div class="level-item has-content-justified-flex-end" v-if="filterable && column.filterable !== false">
                                    <bulmagic-table-filter @filtering="handleFilterInput($event, column)" @clearing="clearFilterInput(column)"></bulmagic-table-filter>
                                </div>
                            </div>
                        </th>
                        <slot name="thead" />
                    </tr>
                </thead>

                <tbody>
                    <slot name="tbody" />
                    <tr v-for="(row, index) in visibleTableData" v-bind:key="index">
                        <td v-if="isEditable" class="has-text-centered" width="75">
                            <button class="button is-primary is-small is-padding-5px is-height-auto" v-if="row.editable !== false" @click="startModalEditing(row, index)">
                                <i :class="editColumnIconClass"></i>
                            </button>
                        </td>

                        <td v-for="column in visibleColumns" :class="columnClasses(column)" :style="columnStyles(column)" :ref="`${column._key}_column`">
                            {{ row[column.name] }}
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <slot name="tfoot" />
                </tfoot>

                <!--<b-loading :active.sync="isLoading" :can-cancel="true" :is-full-page="false"></b-loading>-->
            </table>
        </div>

        <div class="level is-marginless is-padding-top-5px">
            <div class="level-item has-content-justified-flex-start">
                <div class="level-left">
                    <slot name="bottom-left" />
                    <p v-if="usesRemotePagination || usesLocalPagination">
                        Showing {{ visibleTableData.length }} of {{ totalTableDataLength }}
                    </p>
                </div>
            </div>
            <div class="level-item has-content-justified-flex-end">
                <div class="level-right">
                    <slot name="bottom-right" />
                </div>
            </div>
        </div>

        <bulmagic-form :schema="schema"
                    :layout="editingLayout"
                    :store="formStore"
                    :data="editingRow"
                    :title="formTitle"
                    :url="editingRow[updateRowParamName]"
                    method="put"
                    is-modal
                    mount-modal-open
                    suppress-modal-button
                    v-if="isModalEditing"
                    @input="handleEditingInput"
                    @success="handleRowUpdated"
                    @error="handleRowUpdateFailed"
                    @close="stopModalEditing"
        ></bulmagic-form>
    </div>
</template>

<script>
    import VuexMixin from './mixins/vuex';
    import Helpers from '../../mixins/helpers';
    import DataMixin from './mixins/data';
    import ColumnsMixin from './mixins/columns';
    import RenderingMixin from './mixins/rendering';
    import EditingMixin from './mixins/editing';
    import FilteringMixin from './mixins/filtering';
    import SortingMixin from './mixins/sorting';
    import DraggingMixin from './mixins/dragging';
    import GroupingMixin from './mixins/grouping';

    export default {
        name: 'BulmagicTable',
        mixins: [
            VuexMixin,
            Helpers,
            DataMixin,
            ColumnsMixin,
            RenderingMixin,
            EditingMixin,
            FilteringMixin,
            SortingMixin,
            DraggingMixin,
            GroupingMixin,
        ],
        mounted() {
            this.newPerPage = this.perPage;

            this.setColumnKeys();

            if (this.hasRemoteData) {
                this.getRemoteTableData();
            } else {
                this.tableData = this.data;
            }
        }
    }
</script>
