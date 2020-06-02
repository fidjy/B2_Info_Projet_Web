import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate';

import Vuex from 'vuex';

import vuetify from './plugins/vuetify';
import NavBar from "./Layouts/NavBar/NavBar.vue";

Vue.use(Vuelidate);
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.component('NavBar', NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
