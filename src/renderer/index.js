import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

require('./assets/sitewhere.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})
