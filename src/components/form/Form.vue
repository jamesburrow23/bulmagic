<template>
    <form @submit.prevent="submit">
        <div :class="modalClasses">
            <div class="modal-background" v-if="isModalActive" @click="isModalActive = false"></div>
            <div :class="{'modal-card': isModalActive, 'card': isCard}">
                <header :class="cardHeaderClasses" v-if="title || isModal">
                    <p :class="cardHeaderTitleClasses" v-html="title"></p>
                    <button class="delete" aria-label="close" @click="isModalActive = false" v-if="isModal"></button>
                </header>
                <section :class="cardContentClasses">
                    <slot />
                    <div class="columns" v-for="row in layout">
                        <div class="column" v-for="field in row" v-if="schema[field]">
                            <component :is="schema[field].component"
                                       :store="store"
                                       :key="schema[field].key"
                                       v-bind="schema[field]"
                                       v-model="schema[field].value"
                                       @input="handleInput($event, field)"
                            ></component>
                        </div>
                    </div>
                    <div class="columns" v-if="!isModal">
                        <div class="column has-text-right">
                            <slot name="buttons"/>
                            <button class="button" type="reset" v-if="hasResetButton" @click.prevent="reset">
                                <i class="fas fa-undo"></i>&nbsp;{{ resetButtonText }}
                            </button>
                            <button :class="['button is-success', submitButtonClasses]" type="submit">
                                <i class="fas fa-save"></i>&nbsp;{{ submitButtonText }}
                            </button>
                        </div>
                    </div>
                </section>
                <footer :class="cardFooterClasses">
                    <slot name="card-footer" />
                    <div class="column has-text-right" v-if="isModal">
                        <slot name="buttons"/>
                        <button class="button" type="reset" @click.prevent="isModalActive = false">
                            <i class="fas fa-times-square"></i>&nbsp;Close
                        </button>
                        <button class="button" type="reset" v-if="hasResetButton" @click.prevent="reset">
                            <i class="fas fa-undo"></i>&nbsp;{{ resetButtonText }}
                        </button>
                        <button :class="['button is-success', submitButtonClasses]" type="submit">
                            <i class="fas fa-save"></i>&nbsp;{{ submitButtonText }}
                        </button>
                    </div>
                </footer>
                <!--<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>-->
            </div>
        </div>
        <button :class="['button', modalButtonClass]" v-if="isModal && !suppressModalButton" @click.prevent="isModalActive = true">
            <i :class="modalButtonIcon" v-if="modalButtonIcon"></i>&nbsp;{{ modalButtonText }}
        </button>
    </form>
</template>

<script>
    export default {
        name: 'BulmagicForm',
        props: {
            schema: {
                type: Object,
            },
            layout: {
                type: Array,
            },
            data: {
                type: Object,
            },
            title: {
                type: String,
            },
            url: {
                type: String,
            },
            method: {
                type: String,
                default: 'post',
            },
            store: {
                type: String,
            },
            titleClass: {
                type: String,
            },
            modalButtonClass: {
                type: String,
                default: 'is-primary',
            },
            modalButtonText: {
                type: String,
                default: 'Show Form',
            },
            modalButtonIcon: {
                type: String,
                default: 'fas fa-eye',
            },
            submitButtonText: {
                type: String,
                default: 'Submit',
            },
            resetButtonText: {
                type: String,
                default: 'Reset',
            },
            hasResetButton: {
                type: Boolean,
                default: true,
            },
            isModal: {
                type: Boolean,
                default: false,
            },
            isCard: {
                type: Boolean,
                default: false,
            },
            closeModalOnSubmit: {
                type: Boolean,
                default: true,
            },
            suppressModalButton: {
                type: Boolean,
                default: false,
            },
            mountModalOpen: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isModalActive: false,
                isLoading: false,
                validationErrors: {},
                validFields: {},
            }
        },
        watch: {
            isModalActive(newValue) {
                if (!newValue) {
                    this.$emit('close');
                }
            }
        },
        computed: {
            modalClasses() {
                return {
                    'modal': this.isModal,
                    'is-active': this.isModal && this.isModalActive,
                };
            },
            cardHeaderClasses() {
                return {
                    'modal-card-head': this.isModalActive,
                    'card-header': this.isCard,
                    [this.titleClass]: true,
                };
            },
            cardHeaderTitleClasses() {
                return {
                    'modal-card-title': this.isModalActive,
                    'card-header-title': this.isCard,
                    'title has-text-weight-light has-text-centered': !this.isCard && !this.isModal,
                    [this.titleClass]: true,
                };
            },
            cardContentClasses() {
                return {
                    'modal-card-body': this.isModalActive,
                    'card-content': this.isCard,
                };
            },
            cardFooterClasses() {
                return {
                    'modal-card-foot has-content-justified-flex-end': this.isModalActive,
                    'card-footer has-content-justified-flex-end': this.isCard,
                };
            },
            submitButtonClasses() {
                return {
                    'is-loading': this.isLoading,
                };
            },
            namespacedStore() {
                return String(this.store).replace('.', '/');
            },
        },
        methods: {
            submit() {
                this.isLoading = true;

                axios({
                    url: this.url,
                    method: this.method,
                    data: this.getFormData()
                })
                    .then(response => {
                        this.handleFormSubmitted(response);
                    })
                    .catch(error => {
                        switch (error.response.status) {
                            case 422:
                                this.handleValidationErrors(error.response);
                                break;
                            default:
                            this.handleSubmitError(error.response);
                        }
                    });
            },
            reset() {
                _.forEach(this.schema, (settings, field) => {
                    this.setFieldValidationErrors(field, []);
                    this.setFieldValidity(field, false);
                    this.setFieldValue(field, _.get(this.data, field, ''));
                });
            },
            handleInput(value, field) {
                this.setFieldValidationErrors(field, []);
                this.setFieldValidity(field, false);
                this.setFieldValue(field, value);
                this.$emit('input', field, value);
            },
            handleValidationErrors(response) {
                this.isLoading = false;

                _.forEach(this.schema, (settings, field) => {
                    if (_.has(response.data.errors, field)) {
                        this.setFieldValidationErrors(field, response.data.errors[field]);
                    } else {
                        this.setFieldValidationErrors(field, []);
                        this.setFieldValidity(field, true);
                    }
                });
            },
            handleFormSubmitted(response) {
                this.isLoading = false;

                this.setFormValid();

                this.$emit('success', response, this.getFormData());

                if (this.isModal && this.isModalActive && this.closeModalOnSubmit) {
                    this.isModalActive = false;
                }
            },
            handleSubmitError(response) {
                this.isLoading = false;

                this.$emit('error', response, this.getFormData());
            },
            getFormData() {
                let formData = {};

                _.forEach(this.schema, (settings, field) => {
                    formData[field] = settings.value;
                });

                return formData;
            },
            setFieldValidationErrors(field, errors) {
                this.schema[field] = {...this.schema[field], ...{validationErrors: errors}};

                if (this.store) {
                    this.$store.commit(`${this.namespacedStore}/updateField`, {
                        path: `validationErrors.${field}`,
                        value: [...errors],
                    });
                }
            },
            setFieldValidity(field, validity) {
                this.schema[field] = {...this.schema[field], ...{isValid: validity}};

                if (this.store) {
                    this.$store.commit(`${this.namespacedStore}/updateField`, {
                        path: `validFields.${field}`,
                        value: validity,
                    });
                }
            },
            setFieldValue(field, value) {
                this.schema[field].value = value;

                if (this.schema[field].protected !== true && this.store) {
                    this.$store.commit(`${this.namespacedStore}/updateField`, {
                        path: field,
                        value: value,
                    });
                }
            },
            setFormValid() {
                _.forEach(this.schema, (settings, field) => {
                    this.setFieldValidationErrors(field, []);
                    this.setFieldValidity(field, true);
                });
            },
            setFieldStates(state) {
                _.forEach(this.schema, (settings, field) => {
                    if (this.store) {
                        this.schema[field] = {
                            ...settings,
                            ...{
                                validationErrors: _.get(state, `${this.store}.validationErrors.${field}`, []),
                                isValid: _.get(state, `${this.store}.validFields.${field}`, false),
                            }
                        };
                    }
                });
            },
        },
        beforeMount() {
            _.forEach(this.schema, (settings, field) => {
                settings.key = _.random(0, 99999999999);

                if (this.store) {
                    settings.value = _.get(this.data, field, _.get(this.$store.state, `${this.store}.${field}`));
                } else {
                    settings.value = _.get(this.data, field, null);
                }
            });

            if (this.store) {
                this.$store.subscribe((mutation, state) => {
                    let path = _.get(mutation.payload, 'path', '');

                    if (String(path).includes('validationErrors') || String(path).includes('validFields')) {
                        this.setFieldStates(state);
                    }
                });
            }

            this.isModalActive = this.mountModalOpen;
        },
    }
</script>
