import Vue from 'vue';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';

Vue.use(VueResource);
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
});
