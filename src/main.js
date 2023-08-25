import './assets/main.css'
import Paginate from 'vuejs-paginate-next'; // Assuming Paginate is a Vue plugin

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

const app = createApp(App);
app.use(Paginate);
app.mount('#app')
// app.use(createPinia())
// app.use(router)



