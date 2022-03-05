import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import App from './App.vue'
import router from './router'
// import { apply } from 'core-js/fn/reflect'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
