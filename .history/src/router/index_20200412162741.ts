import Vue from 'vue';

import VueRouter from 'vue-router';

import AdminHome from '../views/AdminHome/AdminHome.vue';
import AdminRestaurant from '../views/AdminRestaurant/AdminRestaurant.vue';
import BugReport from '../views/BugReport/BugReport.vue';
import DeliverHome from '../views/DeliverHome/DeliverHome.vue';
import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';
import Register from '../views/Register/Register.vue';
import RestaurantDishes from '../views/RestaurantDishes/RestaurantDishes.vue';
import RestorerHome from '../views/RestorerHome/RestorerHome.vue';
import RestorerMenu from '../views/RestorerMenu/RestorerMenu.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'NavBar' },
    component: Home
  },
  {
    path: '/RestaurantDishes/:restaurant',
    name: 'RestaurantDishes',
    meta: { layout: 'NavBar' },
    component: RestaurantDishes
  },
  {
    path: '/Login/:propsAdresses',
    name: 'Login',
    meta: { layout: 'NavBar' },
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    meta: { layout: 'NavBar' },
    component: Register
  },
  {
    path: '/RestorerMenu',
    name: 'RestorerMenu',
    meta: { layout: 'NavBar' },
    component: RestorerMenu,
  },
  {
    path: '/RestorerHome',
    name: 'RestorerHome',
    meta: { layout: 'NavBar' },
    component: RestorerHome,
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    meta: { layout: 'NavBar' },
    component: AdminHome,
  },
  {
    path: '/AdminRestaurant',
    name: 'AdminRestaurant',
    meta: { layout: 'NavBar' },
    component: AdminRestaurant,
  },
  {
    path: '/DeliverHome',
    name: 'DeliverHome',
    meta: { layout: 'NavBar' },
    component: DeliverHome,
  },
  {
    path: '/BugReport',
    name: 'BugReport',
    meta: { layout: 'NavBar' },
    component: BugReport,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
