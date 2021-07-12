import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

app.mount('#app')
