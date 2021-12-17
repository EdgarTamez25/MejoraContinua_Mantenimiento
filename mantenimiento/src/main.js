import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'moment'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.moment = moment

// Vue.http.options.root = 'http://localhost:80/Proyectos/MANTENIMIENTO/api/public/api/'  // PRDUCCION PARA TEST
Vue.http.options.root = 'http://producciongama.com/MANTENIMIENTO/api/public/api/'   // ROOT PARA PODUCCON 


Vue.http.interceptors.push((request, next) => {
  request.headers.set('Accept', 'application/json')
  next()
});


new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
