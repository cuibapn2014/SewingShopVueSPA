import { createApp } from 'vue'
import './style.css'
import 'floating-vue/dist/style.css'
import './assets/css/tailwind.output.css'
import './assets/css/app.css'
import App from './App.vue'
import VueClickAway from 'vue3-click-away'
import store from './store'
import router from './router'
import moment from "moment"

// import VTooltip from 'v-tooltip'
import FloatingVue from 'floating-vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleNotch)

const app = createApp(App)

/* add moment */
app.config.globalProperties.$moment = moment

app.config.warnHandler = (msg, instance, trace) =>
  ![
    'built-in or reserved HTML elements as component id: component',
    '"class" is a reserved attribute and cannot be used as component prop',
    'Cannot find element: #__nuxt'
  ].some((warning) => msg.includes(warning)) &&
  console.warn('[Vue warn]: '.concat(msg).concat(trace))

app.use(FloatingVue)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueClickAway)
app.use(store)
app.use(router)

app.mount('#app')
