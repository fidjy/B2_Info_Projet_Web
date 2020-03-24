import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NavBar from "./Layouts/NavBar.vue";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.component('NavBar', NavBar);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
