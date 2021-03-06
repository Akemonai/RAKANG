import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
// import VueAxios from "vue-axios";
import vuetify from './plugins/vuetify';
// import CKEditor from 'ckeditor4-vue';
// import CKEditor from 'ckeditor/ckeditor5-vue';
import vmodal from 'vue-js-modal';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use( CKEditor );
// var editor = CKEDITOR.replace( 'editor1' );
// CKFinder.setupCKEditor( editor );

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
Vue.use(ThailandAutoComplete)
Vue.component('ThailandAutoComplete', ThailandAutoComplete)

const base = axios.create({
  baseURL: "https://rakang-server.herokuapp.com/"
  // baseURL: "http://localhost:4000/"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false


// Bootstrap-vue
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//bulma
// import {Pagination, PaginationEvent} from 'vue-pagination-2';

// Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
// Vue.use( CKEditor );
Vue.use(require('vue-moment'));
Vue.use(vmodal, { dialog: true });


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')