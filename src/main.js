import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.use(vuetify)
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

app.mount('#app')
