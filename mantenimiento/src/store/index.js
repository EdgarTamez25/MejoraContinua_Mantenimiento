import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import Login from '@/modules/Login.js';
import Mantenimiento    from '@/modules/Mantenimiento.js';


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    salir(){
      router.push({name: 'home'})
    }
  },
  modules: {
    Login,
    Mantenimiento
  }
})
