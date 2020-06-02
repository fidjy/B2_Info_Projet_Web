import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate';

import VueJwtDecode from 'vue-jwt-decode';

import vuetify from './plugins/vuetify';
import NavBar from "./Layouts/NavBar/NavBar.vue";
VueJwtDecode.decode("<your jwt>");


Vue.use(Vuelidate);

Vue.component('NavBar', NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
