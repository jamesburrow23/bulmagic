# bulmagic

full documentation: https://jamesburrow23.github.io/bulmagic/

### Installation
```
npm install bulmagic
```

### Configuration

```
//in your app.js file import bulmagic
import Bulmagic from 'bulmagic'
Vue.use(Bulmagic);

// and in your app.scss file import the styles*
@import '~bulmagic/dist/bulmagic.css'
```


### Usage
```
(work in progress)

<bulmagic-table :ajax="routes.grid.index"
                :schema="schema"
                :editing-layout="layout"
                :per-page="100"
                table-height="80vh"
                form-title="Edit User"
                title="Users"
                has-remote-data
                has-fixed-header
                load-remote-data-on-scroll
                uses-remote-filtering
                uses-remote-sorting
                uses-remote-pagination
                is-editable
                is-full-width
                @row-updated="handleRowUpdated"
></bulmagic-table>

<bulmagic-form :schema="schema"
               :layout="layout"
               :store="store"
               :data="$page.auth.user"
               method="put"
               :url="url"
               title="Profile"
               title-class="subtitle has-text-weight-light"
               is-card
></bulmagic-form>

//example schema and layout

schema: {
    first_name: {
        component: 'bulma-form-field-input',
        label: 'First Name',
        name: 'first_name',
        leftIcon: 'fal fa-user',
        hasIconsLeft: true,
        isValid: false,
    },
    last_name: {
        component: 'bulma-form-field-input',
        label: 'Last Name',
        name: 'last_name',
        leftIcon: 'fal fa-user',
        hasIconsLeft: true,
        isValid: false,
    },
    email: {
        component: 'bulma-form-field-input',
        label: 'Email',
        name: 'email',
        leftIcon: 'fal fa-envelope',
        hasIconsLeft: true,
        isValid: false,
    },
    phone: {
        component: 'bulma-form-field-input',
        label: 'Phone',
        name: 'phone',
        leftIcon: 'fal fa-phone',
        hasIconsLeft: true,
        isValid: false,
        inputMask: '(###) ###-####',
    },
},
layout: [
    ['first_name', 'last_name'],
    ['email', 'phone']
],
```
