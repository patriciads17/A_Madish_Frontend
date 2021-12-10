import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';
import DatetimePicker from 'vuetify-datetime-picker'

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';
Vue.use(DatetimePicker)

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
