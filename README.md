# bulmagic

## installation
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
```
