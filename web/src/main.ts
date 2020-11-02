import Vue from 'vue'
import App from './app.vue'
import './register-service-worker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/vue-katex'
import './plugins/choiceside-components'
import './plugins/vue2-transitions'
import './styles/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
