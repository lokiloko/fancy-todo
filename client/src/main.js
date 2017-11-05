// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert2'
import store from './vuex/store'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'https://todo-api.lokilokostudio.tk/api'
})

Vue.prototype.$swal = swal

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'lightgreen',
  accent: 'lime',
  warn: 'red',
  background: 'white'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
