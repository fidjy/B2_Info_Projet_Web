import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate';

import Vuex from 'vuex';

import vuetify from './plugins/vuetify';
import NavBar from "./Layouts/NavBar/NavBar.vue";

[Vuelidate, Vuex].forEach((x) => Vue.use(x));

Vue.component('NavBar', NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
