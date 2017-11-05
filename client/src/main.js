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
import 'sweetalert2/dist/sweetalert2.min.css'
import 'sweetalert2/dist/sweetalert2.min.js'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {token:localStorage.getItem('token')}
})

Vue.prototype.$swal = swal

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'green',
  accent: 'lime',
  warn: 'red',
  background: 'white'
})

Vue.material.registerTheme({
  blue: {
    primary: 'blue',
    accent: 'pink',
    warn: 'red'
  }
})

Vue.material.registerTheme({
  brown: {
    primary: 'brown',
    accent: 'black',
    warn: 'red'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
