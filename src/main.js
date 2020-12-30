import "normalize.css";
import Vue from "vue";
import Vuelidate from 'vuelidate';
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import App from "./App.vue";
import { store } from "./store/store";
import { routes } from "./routes";


Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode : "history"
});


new Vue({
  render: h => h(App),
  store,router
}).$mount("#app");
