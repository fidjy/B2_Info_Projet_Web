import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import NavBar from "./Layouts/NavBar/NavBar.vue";

Vue.component('NavBar', NavBar);

Vue.config.productionTip = true;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
