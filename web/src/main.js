import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import routes from './routes'

// TODO Import all with one line
import './styles/_bootstrap.scss'
import './styles/forms.scss'
import './styles/buttons.scss'
import './styles/sizes.scss'

// TODO Add header, main, footer

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({routes, mode: 'history'})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
