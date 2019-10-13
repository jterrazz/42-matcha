import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import routes from './routes'

import './styles/_bootstrap.scss'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({routes, mode: 'history'})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
