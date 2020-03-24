import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../views/Home/Home.vue';
import RestaurantDishes from '../views/RestaurantDishes/RestaurantDishes.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'NavBar'},
    component: Home
  },
  {
    path: '/RestaurantDishes',
    name: 'RestaurantDishes',
    meta: {layout: 'NavBar'},
    component: RestaurantDishes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
