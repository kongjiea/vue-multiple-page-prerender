/**
 *  攻略分享详情
 *  author：liyi
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Register from '../../components/Register.vue';
import Register from './Register.vue';
Vue.use(Router)


// Vue.prototype.$message = Message;
// Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
    el: '#app',
  router:new Router({
    mode: 'history',
    routes: [
      {
        path: '/Register',
        /*name: 'Register',
        component: Register*/
      }
    ]
  }),
    components: { Register },
    template: '<Register/>'
});
