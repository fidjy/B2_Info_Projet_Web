import Vue from 'vue';

import VueRouter from 'vue-router';

import Account from '../views/Account/Account.vue';
import AdminCommandsUser from '../views/AdminCommandsUser/AdminCommandsUser.vue';
import AdminHome from '../views/AdminHome/AdminHome.vue';
import AdminRestaurant from '../views/AdminRestaurant/AdminRestaurant.vue';
import AdminUsers from '../views/AdminUsers/AdminUsers.vue';
import BugReport from '../views/BugReport/BugReport.vue';
import DateDelivery from '../views/DateDelivery/DateDelivery.vue';
import DeliverHome from '../views/DeliverHome/DeliverHome.vue';
import favorit from '../views/Favorit/favorit.vue';
import History from '../views/History/History.vue';
import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';
import Purchase from '../views/Purchase/Purchase.vue';
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
    path: '/Login',
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
  {
    path: '/Purchase',
    name: 'Purchase',
    meta: { layout: 'NavBar' },
    component: Purchase,
  },
  {
    path: '/Account',
    name: 'Account',
    meta: { layout: 'NavBar' },
    component: Account,
  },
  {
    path: '/DateDelivery',
    name: 'DateDelivery',
    meta: { layout: 'NavBar' },
    component: DateDelivery,
  },
  {
    path: '/AdminUsers/:restaurant',
    name: 'AdminUsers',
    meta: { layout: 'NavBar' },
    component: AdminUsers,
  },
  {
    path: '/History',
    name: 'History',
    meta: { layout: 'NavBar' },
    component: History,
  },
  {
    path: '/AdminCommandsUser/:command',
    name: 'AdminCommandsUser',
    meta: { layout: 'NavBar' },
    component: AdminCommandsUser,
  },
  {
    path: '/favorit',
    name: 'favorit',
    meta: { layout: 'NavBar' },
    component: favorit,
  },
  {
    path: '/adminBugReport',
    name: 'adminBugReport',
    meta: { layout: 'NavBar' },
    component: adminBugReport,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
