import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';
import RestaurantDishes from '../views/RestaurantDishes/RestaurantDishes.vue';
import RestorerHome from '../views/RestorerHome/RestorerHome.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/e',
    name: 'Home',
    meta: {layout: 'NavBar'},
    component: Home
  },
  {
    path: '/RestaurantDishes/:restaurant',
    name: 'RestaurantDishes',
    meta: {layout: 'NavBar'},
    component: RestaurantDishes
  },
  {
    path: '/Login/:propsAdresses',
    name: 'Login',
    meta: {layout: 'NavBar'},
    component: Login
  },
  {
    path: '/RestorerOrdered',
    name: 'RestorerOrdered',
    meta: {layout: 'NavBar'},
    component: RestorerHome,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
