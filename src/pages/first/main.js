import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '@/plugins/element';

Vue.config.productionTip = false;
import '@/assets/css/index.less';
import '@/components/componentRegister';

window.$apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://10.66.176.146:8085'
    : window.location.origin;
window.$socket =
  process.env.NODE_ENV === 'development'
    ? '10.88.44.121:8288'
    : window.location.origin.split('http://')[1];

import CommonInterface from '@/utils/interface';
Vue.prototype.CommonInterface = CommonInterface;

if (!Promise.finally) {
  Promise.prototype.finally = function(cb) {
    const con = this.constructor;
    return this.then(
      value => con.resolve(cb()).then(() => value),
      reason =>
        con.resolve(cb()).then(() => {
          throw reason;
        })
    );
  };
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
