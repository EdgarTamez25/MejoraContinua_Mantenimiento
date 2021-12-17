import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home 	           from '../views/Home.vue'
import Mantenimiento 	   from '../views/Mantenimiento.vue'
import Calendario        from '@/views/calendario.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/'				                  , name: 'inicio'                   , component: Home          , meta: { libre:true}},
  { path:'/mantenimiento'             , name: 'mantenimiento'            , component: Mantenimiento , meta: { libre:true}},
  { path:'/calendario.mantenimiento'  , name: 'calendario.mantenimiento' , component: Calendario    , meta: { libre:true}},
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
