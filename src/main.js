import { createApp } from 'vue'
import './style.css'
import './assets/css/tailwind.output.css'
import App from './App.vue'
import VueClickAway from 'vue3-click-away'
import store from './store'
import router from './router'
import axios from 'axios'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleNotch)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueClickAway)
app.use(store)
app.use(router)

app.mount('#app')
