import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/sass/themes/light.orange.scss'
import './assets/fonts/iconsmind-s/css/iconsminds.css'

import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import Colxx from '@/components/common/Colxx'

Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar)
Vue.component('b-colxx', Colxx)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
